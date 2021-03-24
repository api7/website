---
title: "Amazon EKS 和 APISIX ingress controller 如何配合使用来管理复杂流量"
avatar: ""
author: "亚马逊云科技 AWS云计算"
href: ""
date: 2021-02-07
---  

## 背景

作为流量管理人员，有时候，即使做好了万全准备，也难挡突发状况的出现。构建四通八达的 API 网关至关重要！今天就来为大家介绍**Amazon EKS + Ingress APISIX！**是如何帮助我们解决这个问题的。

## 简介

Kubernetes 是一个开源系统，用于自动化容器化应用程序的部署、扩展和管理。**Amazon Elastic Kubernetes Service（Amazon EKS）作为一种托管的 Kubernetes 服务，您可以在亚马逊云科技上轻松运行 Kubernetes 负载而无需对控制平面或节点进行安装和维护。**

**Apache APISIX 是一个动态、实时、高性能的 API 网关。它提供了丰富的流量管理功能，如负载平衡、动态上游、灰度部署、流量分割、身份验证和可观测性等**。您可以使用 Apache APISIX 处理传统客户端和服务器之间的南北流量以及服务之间的东西流量。

Ingress APISIX 可以将 Apache APISIX 作为 Kubernetes 的入口控制器使用，从而为 Kubernetes 引入 Apache APISIX 的各项优秀功能。借助妥善设计的 Controller 组件的驱动，可以帮助用户满足复杂的流量管理需求。

![apisix-ingress-controller技术架构](https://static.apiseven.com/202102/WechatIMG3731.jpeg)

## 如何在 Amazon Elastic Kubernetes Service 上配置和运行 Ingress APISIX。

### **前提要求**

准备运行前，请在亚马逊云科技上配置好可用的 Amazon EKS 集群。

你自己的环境中应具备 kubectl 工具，请运行如下命令将上下文设置为自己的 Amazon EKS 集群：

    aws eks update-kubeconfig --name <your eks cluster name> --region <your region>

Kubernetes 集群就绪后，创建名为 ingress-apisix 的名称空间，后续用到的所有资源都将创建于该名称空间中。

    kubectl create namespace ingress-apisix

我们将使用 Helm 部署 Ingress APISIX（Apache APISIX 和 apisix-ingress-controller）的所有组件，因此也请按照安装指南(https://helm.sh/docs/intro/install/)  来安装 Helm。适用于 Apache APISIX 和 apisix-ingress-controller 的 helm chart 位于 apache/apisix-helm-chart (https://github.com/apache/apisix-helm-chart) 和 apache/apisix-ingress-controller (https://github.com/apache/apisix-ingress-controller) 路径下，请克隆这些路径以获得相应的 chart。

### **安装 Apache APISIX**

Apache APISIX 充当了apisix-ingress-controller的代理平面，应提前部署完成。

    cd /path/to/apisix-helm-chart
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm dependency update ./chart/apisix
    helm install apisix ./chart/apisix \
      --set gateway.type=LoadBalancer \
      --set allow.ipList="{0.0.0.0/0}" \
      --namespace ingress-apisix
    kubectl get service --namespace ingress-apisix

上述命令将创建两个 Kubernetes Service 资源，一个为负责处理真实流量的 apisix-gateway，另一个为充当控制平面并处理所有配置改动的 apisix-admin。此处我们将 apisix-gateway 创建为 LoadBalancer 类型的服务，可借助 Amazon Network Load Balancer 将其暴露至互联网。我们可通过下列命令找到负载均衡器的主机名：

    kubectl get service apisix-gateway \
    --namespace ingress-apisix \
    -o jsonpath='{.status.loadBalancer.ingress[].hostname}'

另外要注意：allow.ipList 字段应根据我们自己 Amazon EKS 集群中的 EKS CIDR Ranges 进行定制，这样 apisix-ingress-controller 即可由 Apache APISIX 进行授权（用于推送资源）。

如果还有其他需求，请参阅 value.yaml (https://github.com/apache/apisix-helm-chart/blob/master/chart/apisix/values.yaml) 进一步了解所有配置项。

### **安装 apisix-ingress-controller**

成功部署 Apache APISIX 后，需要安装 Controller 组件了。

    cd /path/to/apisix-ingress-controller
    # install base resources, e.g. ServiceAccount.
    helm install ingress-apisix-base -n ingress-apisix ./charts/base
    # install apisix-ingress-controller
    helm install ingress-apisix ./charts/ingress-apisix \
      --set ingressController.image.tag=dev \
      --set ingressController.config.apisix.baseURL=http://apisix-admin:9180/apisix/admin \
      --set ingressController.config.apisix.adminKey={YOUR ADMIN KEY} \
      --namespace ingress-apisix

ingress-apisix-base chart 会为 apisix-ingress-controller 安装一些基本依赖项，例如 ServiceAccount 及其专用 CRD 等内容。

ingress-apisix chart 将引导我们安装 Controller 自身，我们可以将 image 标签更改为所需的发布版本，并可更改上述命令中 ingressController.config.apisix.adminKey 的值，这些配置可根据实际场景进行调整（并确保此处使用的 Admin key 与 Apache APISIX 部署中所用的 Key 相同）。如果还有其他需求，可以参阅 value.yaml 进一步了解所有配置项。

随后试着打开 **Amazon EKS 控制台**，选择自己的集群并单击 Workloads 标签，所有将能看到 Apache APISIX 的所有 Pod、etcd 以及 apisix-ingress-controller 均已就绪。

### **开始测试**

至此我们已经部署了 Ingress APISIX 的所有组件，请务必验证一切均可正常运行。随后我们将部署一个 httpbin 服务并要求 Apache APISIX 将所有到”local.httpbin.org”主机的请求路由至该服务。

为此，我们首先需要创建 httpbin 工作负载并将其暴露出来。

    kubectl run httpbin --image kennethreitz/httpbin --port 80
    kubectl expose pod httpbin --port 80

为了让 Apache APISIX 对请求进行正确的路由，我们需要创建一个 ApisixRoute 资源驱动这一过程。

    # ar-httpbin.yaml
    apiVersion: apisix.apache.org/v1
    kind: ApisixRoute
    metadata:
      name: httpserver-route
    spec:
      rules:
      - host: local.httpbin.org
        http:
          paths:
          - backend:
              serviceName: httpbin
              servicePort: 80
            path: /*

上述 ApisixRoute 资源会让 Apache APISIX 将主机头为“local.httpbin.org”的请求路由至（我们刚刚创建的）httpbin 后端。

随后应用该设置，但请注意：该服务和 ApisixRoute 资源应放置在同一个名称空间中，apisix-ingress-controller 不允许跨越名称空间。

    kubectl apply -f ar-httpbin.yaml

从可触达 Apache APISIX 服务的任意位置通过一个简单的 curl 调用测试结果。

    $ curl http://{apisix-gateway-ip}:{apisix-gateway-port}/headers -s -H 'Host: local.httpbin.org'


    {
      "headers": {
        "Accept": "*/*",
        "Host": "httpbin.org",
        "User-Agent": "curl/7.64.1",
        "X-Amzn-Trace-Id": "Root=1-5ffc3273-2928e0844e19c9810d1bbd8a"
      }
    }

如果 Serivce 类型为 ClusterIP，则需要登录到 Amazon EKS 集群中的一个 Pod，随后使用 ClusterIP 或 Service FQDN 访问 Apache APISIX。如果已经暴露（无论暴露了 NodePort或 LoadBalancer），则可直接访问可触达的外部端点。

注：该文章转自 aws 微信公众号。
