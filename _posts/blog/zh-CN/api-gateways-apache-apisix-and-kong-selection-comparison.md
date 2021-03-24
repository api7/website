---
title: "API 网关 Apache APISIX 和 Kong 的选型对比"
avatar: "https://avatars.githubusercontent.com/u/26448043?s=460&u=9a51a2ee99658ea30918952675fdffeca8b5dc4c&v=4"
author: "温铭"
href: "https://github.com/moonming"
date: 2020-01-18
---

Apache APISIX 和 Kong 都是开源的微服务 API 网关，那么在这两者之间，如何去做比较和选择呢？

这两个项目都有完善的文档和测试来覆盖，也有不少的生产用户在使用，所以不用去担心稳定性和它们的可持续发展，本文会从功能和性能这两个最直接和可验证的角度去做下对比。

### 功能

从 API 网关核心功能点来看，两者均已覆盖：

| **功能**             | **Apache APISIX** | **KONG** |
| :------------------- | :---------------- | :------- |
| **动态上游**         | 支持              | 支持     |
| **动态路由**         | 支持              | 支持     |
| **健康检查和熔断器** | 支持              | 支持     |
| **动态 SSL 证书**    | 支持              | 支持     |
| **七层和四层代理**   | 支持              | 支持     |
| **分布式追踪**       | 支持              | 支持     |
| **自定义插件**       | 支持              | 支持     |
| **REST API**         | 支持              | 支持     |
| **CLI**              | 支持              | 支持     |

更详细的比较：


| **功能**                              | **Apache APISIX**                       | **KONG**               |
| :------------------------------------ | :-------------------------------------- | :--------------------- |
| 项目归属                              | Apache 软件基金会                       | Kong Inc.              |
| 技术架构                              | Nginx + etcd                            | Nginx + postgres       |
| 交流渠道                              | 微信群、QQ 群、邮件列表、GitHub、meetup | GitHub、论坛、freenode |
| 单核 QPS (开启限流和 prometheus 插件) | 18000                                   | 1700                   |
| 平均延迟                              | 0.2 毫秒                                | 2 毫秒                 |
| 支持 Dubbo 代理                       | 是                                      | 否                     |
| 配置回滚                              | 是                                      | 否                     |
| 支持生命周期的路由                    | 是                                      | 否                     |
| 插件热更新                            | 是                                      | 否                     |
| 用户自定义：负载均衡算法、路由        | 是                                      | 否                     |
| resty <--> gRPC 转码                  | 是                                      | 否                     |
| 支持 Tengine 作为运行时               | 是                                      | 否                     |
| MQTT 协议支持                         | 是                                      | 否                     |
| 配置生效时间                          | 事件通知，低于 1 毫秒更新               | 定期轮询，5 秒         |
| 自带控制台                            | 是                                      | 否                     |
| 对接外部身份认证服务                  | 是                                      | 否                     |
| 配置中心高可用(HA)                    | 是                                      | 否                     |
| 指定时间窗口的限速                    | 是                                      | 否                     |
| 支持任何 Nginx 变量做路由条件         | 是                                      | 否                     |

### 性能
在开启了 limit-count 和 prometheus 这两个插件后，Apache APISIX 的性能是 Kong 的十倍，
这里有比较详细的[步骤](https://gist.github.com/membphis/137db97a4bf64d3653aa42f3e016bd01)，
感兴趣的开发者可以按图索骥，来进行验证。

### 原因
这里，我们讨论下功能和性能差异背后的原因：
1. Apache APISIX 的路由复杂度是 O(k)，只和 uri 的长度有关，和路由数量无关；kong 的路由时间复杂度是 O(n)，随着路由数量线性增长。

2. Apache APISIX 的 IP 匹配时间复杂度是 O(1)，不会随着大量 IP 判断而导致 CPU 资源跑满。

3. Apache APISIX 的路由匹配，接受 Nginx 的所有变量作为条件，并且支持自定义函数；其他网关都是内置的几个条件。

4. Apache APISIX 使用 etcd 作为配置中心，没有单点，任意宕掉一台机器，网关集群还能正常运行。其他基于关系型数据库的网关都会有单点问题。

5. Apache APISIX 的配置下发只要 1 毫秒就能达到所有网关节点，使用的是 etcd 的 watch；其他网关是定期轮询数据库，一般需要 5 秒才能获取到最新配置。

6. Apache APISIX 的插件都经过精心调优，在高压力下依然保持毫秒级别延迟。

7. Apache APISIX 独有的插件编排和低代码功能，可以大大降低二次开发的门槛。


<iframe src="//player.bilibili.com/player.html?aid=626036919&bvid=BV1Zt4y1X73K&cid=202170017&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
