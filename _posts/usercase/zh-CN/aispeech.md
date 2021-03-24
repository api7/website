---
title: "思必驰：为什么我们重新写了一个 k8s ingress controller？"
date: 2020-05-07 
avatar: "https://avatars.githubusercontent.com/u/4413028?s=460&u=e140a6d2bf19c426da6498b8888edc96509be649&v=4"
author: "金卫"
href: "https://github.com/gxthrj"
---  

**前言**

大家好，我是来自苏州思必驰的金卫，今天和大家聊聊 [Apache APISIX](https://github.com/apache/apisix) 与 k8s 集成代替原生 ingress 的话题。

写这篇文章时，我们已经在生产环境上应用了 Apache APISIX，接管了部分业务的入口流量，同时正逐步把原生 ingress 中流量迁移过来，如下图所示：

![2.png](https://static.apiseven.com/2020/05/9c662387-7964-4ade-a469-0b7daa06d7f5-image.png)

借助 Apache APISIX 动态路由能力做流量分发，同时自定义一些插件，满足业务需求。

APISIX-ingress-controller 将 pod ip 注册到 upstream 的，node 中，业务流量可以绕过 kube DNS 直接访问到 pod。也正是在此基础上，可以通过插件实现一些特殊负载均衡策略。

从图上看，好像做了一件与原生 ingress 重复的事情。那这篇文章我们就简单介绍一下为什么舍弃原生 ingress，用 Apache APISIX 自建一套 ingress controller。

## ingress 是什么

简单讲，Ingress 是 Kubernetes 处理边缘入口流量的一种方式。

## ingress 解决什么问题

由于 Kubernetes 集群内的服务都是虚拟网络，外部流量访问集群内部，至少需要一个公网ip和端口映射。

Kubernetes 有多种暴露边缘接口的方式，比如，nodeport、loadBalancer、ingress 等方式，相比而言，ingress 通过暴露有限的公网 ip，使用反向代理的方式，无疑是一种更加经济的方式。

说到反向代理，我们也可以直接搭建一个 Nginx 来做反向代理，但是要在 Nginx 里同步 Kubernetes 中随时可变的服务状态，明显增加了维护难度。

好在 Kubernetes 官方提供并维护了一个 nginx ingress controller，帮助我们解决了反向代理的事情，有了这个 nginx ingress controller，可以帮助我们代理所有想要访问 Kubernetes 的边缘流量，并且将流量正确的指向后端服务。

## Kubernetes 原生 ingress controller 的问题

Nginx ingress controller 帮助我们维护了 Kubernetes 集群与 Nginx 的状态同步，并且提供了基本的反向代理能力，为什么我们还要自己造个轮子呢? 业务的需求不容忽视，我们对 ingress controller 有更多的期待。

在使用 Kubernetes 原生 ingress controller 之后，我们发现以下几点比较突出的问题:

1. reload 问题

    Kubernetes 原生 ingress 在设计上，将 YAML 配置文件交由 ingress controller 处理，转换为 nginx.conf，再触发 reload nginx.conf 使配置生效。
    
    日常运维免不了偶尔动一动 ingress YAML 配置，每一次配置生效，都会触发一次 reload，这是不能接受的，尤其在边缘流量采用⻓连接时，更容易导致事故。
  
    Apache APISIX 支持热配置，随时可以定义和修改路由，而且不会触发 nginx reload。
  
2. 在 annotation 中写脚本、填充参数

    原生 ingress controller 支持在 yaml 中 annotation 定义脚本片段，感觉是为了支持高级功能而实现的一个临时方案，说实话，真不好管理。大量的 annotation 脚本给配置人员带来困扰。
  
    在 Apache APISIX 中，我们可以通过插件代码编写逻辑，暴露出简单的配置接口，方便配置的维护，避免脚本对配置人员的干扰。

3. 缺少对有状态负载均衡的支持

    高级的负载均衡策略并没有支持，比如 session persistent 等。kubernetes 是一个面向运维的非业务管理系统，个人认为这或许与 kubernetes 主推无状态的 deployment 部署方式有关，因此 kubernetes 官方短期内并不会支持这些与之相悖的负载均衡策略。

    事实上，google 已经在其推出的 service mesh 方案（istio）上尝试解决这类问题。istio 架构虽然完美，但是却牺牲了性能，这一切也许会在其 mixer v2 上解决。

    既然 kubernetes 支持扩展，我们也可以基于 Apache APISIX 扩展出符合我们要求的高级负载均衡需求，因为 Apache APISIX 不仅原生支持了 session persistent 等负载均衡，同时还预留 balancer 阶段的扩展能力。

4. 动态调整权重

    业务服务常常需要按照百分比控制流量，这在 Kubernetes 中却变成了麻烦。
    
    虽然 Kubernetes 在 1.8 之后支持了 ipvs，无论是 kube-proxy 的启动参数，还是 kube-route 的 annotation，在使用上都没有 Apache APISIX 容易上手。Apache APISIX 内部抽象出 route、service、consumer、upstream、plugin 等主要对象，调整权重这类操作天然支持，只需简单的修改 upstream 下的 node weight 即可。

5. 扩展能力薄弱

    虽然 ingress 设计之初为了解决边缘流量，但人们对于边缘流量的需求一点都不比内部流量少。
    
    业务级灰度控制、熔断、流量控制、鉴权、流量管控等需求在 ingress 上实现的呼声更高。
    
    然而原生 ingress 提供的扩展此时却捉襟⻅肘。Apache APISIX 在扩展能力上提供了插件的支持，除了官方提供的插件之外，你可以自定义满足自身特性的插件。

    还有一些类似 configmap 和 namespaces 造成的一些配置问题，与大家的使用方式有关，不具备通用性，这里不再赘述。

## Apache APISIX ingress controller

由于 Apache APISIX 强大的路由和扩展能力，将 Apache APISIX 作为 ingress 的一种实现，可以轻松解决以上提到的痛点，也为社区多一种 ingress controller 选择。

时序图如下:

![1.png](https://static.apiseven.com/2020/05/ef94496d-c0e5-41ff-a56f-a497cdf03218-image.png)

想要实现 Apache APISIX ingress controller，需要解决两类基础问题，一是解决 kubernetes 集群与 Apache APISIX 状态的同步; 二是将 Apache APISIX 中的对象在 kubernetes 中定义出来 (CRD)。

为了快速集成 Apache APISIX，发挥出 Apache APISIX 的优势，我们创建了 [Apache APISIX ingress controller](https://github.com/apache/apisix-ingress-controller) 项目(欢迎大家参与)，该项目目前初步实现了第一类基础问题: 同步 Kubernetes pod 信息到 Apache APISIX 中的 upstream，同时实现主备，解决自身的高可用问题。

由于 Kubernetes 采用 YAML 申明式定义集群状态，我们需要为 Apache APISIX 中的对象(route/service/upstream/plugin) 定义 CRD(Custom Resource Definitions), 以融入 kubernetes。

同时为了方便现有 Kubernetes ingress 使用者的迁移，我们会尽量兼容现有 ingress 的配置项。

这些特性将是我们接下来努力的目标，欢迎大家一起参与。
