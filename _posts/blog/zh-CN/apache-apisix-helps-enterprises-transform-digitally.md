---
title: "Apache APISIX 助力企业数字化转型"
date: 2021-02-04
---

## 背景

随着互联网、大数据、云计算、人工智能、物联网、区块链等一系列技术创新与行业服务的加速融合，行业产品创新能力正在不断提升，数字化、智能化不断催生新兴的服务模式和新产品，已成为企业数字化转型升级的新方向。

企业用户采购 API 网关作为企业自身数字化转型的一环，为后续持续转型和升级做铺垫，逐步向“全面云化”、“分布式化”、“智能化”、“开放化”的新技术体系演进。云原生 API 网关 Apache APISIX，可以完美的助力企业完成 API 管理和微服务架构转型。此外基于开源 APISIX 还有 k8s Ingress Controller 和 Service Mesh 产品，企业用户后续升级到 Kubernetes 和服务网格，提供统一、顺滑的过渡方案。底层技术栈的统一，极大降低学习、管理维护成本。

同时，在云原生架构下，开源 + 购买商业支持的方式是首选，这不仅仅保证企业自身不被具体商业公司锁定，更重要的是，可以让企业保持快速的技术升级，以便让技术满足产品的迭代， 最终在竞争中取得优势。

APISIX 是 Apache 基金会的顶级项目，同时也在云原生软件基金会（CNCF）的全景图中，与 Apache 基金会旗下的各种大数据组件和 CNCF 的各种云原生组件，有着非常好的生态，可以方便的对接企业用户在大数据和云原生领域的其他系统。

目前已有众多国内外知名互联网和传统公司采用  Apache APISIX，使用案例分布在金融、电信运营商、物联网、零售、在线教育、航空航天等多个行业，包括 NASA、航天网信、欧盟数字工厂、思必驰、中国移动、腾讯、虎牙、奈雪的茶、雪球、空中云汇、泰康人寿、作业帮、嘀嗒出行、明源云等。

深圳支流科技是 Apache APISIX 的原厂，初始团队来自中国知名互联网公司，投资方包括真格基金和真成投资，可以提供本地化和专业的服务。

## API 网关典型需求

| **需求**                  | **说明**                                                                 | [APISIX](https://github.com/apache/apisix)**支持情况**                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **控制台**                | 支持操作人员在控制台上操作，完成 API 管理、监控等需要                    | [APISIX](https://github.com/apache/apisix) 提供了方便使用的 dashboard，支流科技在开源 APISIX 的基础上增加了用户、角色、工作区、多集群等企业级功能。                                                                                                                                                                                                                                                                       |
| **用户认证**              | 支持 JWT、                                                               | &nbsp;                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **动态路由、上游**        | 动态添加修改路由、上游                                                   | 在 APISIX 中路由、上游的添加修改是原生动态的，内存生效不需要任何进程替换，相比 Nginx 等需要 reload 的实现方案要好，不会产生流量抖动。                                                                                                                                                                                                                                                                                     |
| **负载均衡器**            | 反向代理支持指定不同负载均衡算法                                         | 除了已支持带有权重的 roundrobin 和一致性哈希算法外，还支持指数加权移动平均法（EWMA）和最小连接数算法。<br>[APISIX](https://github.com/apache/apisix) 是目前**唯一**支持用户自定义负载均衡策略的 API 网关，满足企业用户的一些特殊场景需求。                                                                                                                                                                                |
| **限流、限速熔断**        | 为保护上游对请求流量做频度控制                                           | 支持单机和集群两种方式限流限速。<br>单机主要有三种：<br>1. limit-count：指定时间限制请求总数。<br>2. limit-req：限制请求频率。<br>3. limit-conn：限制并发数。<br>集群支持两种：<br>limit-count 和 limit-conn。                                                                                                                                                                                                            |
| **监控告警**              | 对 API 请求、API 网关自身做监控，支持设置阈值完成告警                    | 监控，目前已支持下面三种类型：<br>1. Metric：支持 [Prometheus](https://prometheus.io) 对接。<br>2. Logging：将访问日志（动态自定义）发送到指定 HTTP、TCP 或 UDP 服务。<br>3. Tracing： [OpenTracing](https://opentracing.io) 协议，支持 [SkyWalking](https://skywalking.apache.org) 、 [Zipkin](https://zipkin.io) 等实现。<br>告警：<br>1. 支持任何 HTTP 或 syslog 方式发送告警信息。<br>2. 支持插件方式完成企业自定义。 |
| **上游健康检查**          | 剔除不健康节点                                                           | 检查方式支持下面两种：<br>1. 主动健康检查：主动探测上游服务是否健康，剔除不健康节点。<br>2. 被动健康检查：根据请求应答码更新节点状态，剔除不健康节点。                                                                                                                                                                                                                                                                    |
| **多集群管理**            | 管理控制台统一登录，同时管理不同集群的 API                               | 在 [API7](https://www.apiseven.com/zh/apisix-vs-api7) 支持多集群：不同集群有完全独立的 API 和资源。企业不同主要业务线，为了避免相互干扰，优先推荐集群方式隔离。                                                                                                                                                                                                                                                           |
| **API 编排**              | 通过一个请求来调用多个微服务，并对返回结果做数据处理，最终整合成一个结果 | 支持两种方式完成此特性：<br>1. 通过 [GraphQL](https://graphql.org) 方式直接完成 API 的编排，目前 APISIX 已经开源支持。<br>2. 通过自定义插件方式扩充满足企业 API 编排需求。                                                                                                                                                                                                                                                |
| **swagger 格式 API 导入** | 使用 [swagger](https://swagger.io) 标准完成 API 批量导入                 | 已内置支持 [OpenAPI Specification3.0](https://swagger.io/specification) 方式导入 [swagger](https://swagger.io) 。                                                                                                                                                                                                                                                                                                         |

## 关于 Apache APISIX

**1. Apache 顶级项目**

Apache APISIX 是中国最快毕业的孵化器项目，也被纳入了 CNCF 全景图中。

![1.png](https://static.apiseven.com/logo/20210203/1.png)

目前很多流行的 AI、大数据类开源项目，主要集中在 Apache 基金会（300 多顶级项目）。APISIX 与这些项目具有相同的文化认同，更容易完成生态对接（如下图）。

![2.png](https://static.apiseven.com/logo/20210203/2.png)

**2. CNCF 基金会生态**

APISIX 的配置中心使用 etcd ，更适合云原生技术架构，降低用户使用和运维成本。

![3.png](https://static.apiseven.com/logo/20210203/3.png)

[支流科技](https://www.apiseven.com/zh)还捐献了 APISIX Ingress Controller 到 Apache 基金会，为 Kubernetes 流量入口转发多一个选择。APISIX 也支持 [helm chart](https://helm.sh) 方式安装，简化 Kubernetes 环境内 APISIX 部署。

**3. 全世界最活跃 API 网关项目**

Apache APISIX 是全球最活跃的开源 API 网关项目，在中国所有开源项目中排名第 22 位。参考维度（如下图）有活跃开发者数量、活跃 PR 和 Issue 数量等。

![4.png](https://static.apiseven.com/logo/20210203/4.png)

**4. 智能面，插件编排**

开发者可以使用 DAG（有向无环图）对插件进行编排，通过决策树对请求流量进行实时分析和处理，以此实现了低代码 API 网关。

用户在界面上通过拖拉拽方式，自由编排插件执行顺序，让产品经理或运维可以直接完成业务需求。利用该特性，可以让 APISIX 直接与智能 AI 服务配合。

![5.png](https://static.apiseven.com/logo/20210203/5.png)

插件编排是 APISIX 独创，**是全球唯一支持插件编排的智能 API 网关**。文档不支持动画，可以在支流科技官网查看动画演示：[https://www.apiseven.com/zh](https://www.apiseven.com/zh) 。

**5. 架构优势，内置高可用**

APISIX 是一整套完整的 API 网关解决方案，不仅提供数据面（Data Plane）实现，也提供了控制面（Control Plane）实现，二者均为无状态设计，可以根据需求自由扩缩容。

![6.png](https://static.apiseven.com/logo/20210203/6.png)

**6. 路由、上游、SSL 等对象全部支持动态指定**

与传统 HAProxy、Nginx、Spring Cloud Gateway、Zuul 等不支持动态路由的方案相比， APISIX 的所有对象全部是内存动态添加或更新，数据替换或更新时不会产生任何进程重启，最小化影响线上流量。

**7. 性能指标最好 API 网关**

APISIX 是目前所有开源 API 网关产品中性能技术指标表现最好，毫秒级低延迟，满足企业用户对 API 的实时性要求。

**8. 使用案例**

目前已有众多国内外知名互联网和传统行业公司采用  Apache APISIX，使用案例分布在金融、电信运营商、物联网、零售、在线教育、航空航天等多个行业，包括 NASA、航天网信、欧盟数字工厂、思必驰、中国移动、腾讯、虎牙、奈雪的茶、雪球、空中云汇、作业帮、嘀嗒出行、明源云等。

![7.png](https://static.apiseven.com/logo/20210203/7.png)

对非常关心延迟指标的金融、证券行业，也在生产环境使用了 APISIX，比如前面提到的[空中云汇](https://www.airwallex.com/cn)等。

## 关于支流科技公司

**1. 团队成员**

- Apache APISIX PMC 成员和 committer
- Apache Skywalking committer
- OpenResty（Nginx + Lua）维护者
- 《OpenResty 最佳实践》、《OpenResty 从入门到实践》作者

**2. 融资背景**

支流科技在半年时间内，完成了数百万美元的融资，投资方为[真格基金](http://www.zhenfund.com)和[真成投资](http://www.zhenchengcap.com)。

![8.png](https://static.apiseven.com/logo/20210203/8.png)

## 云原生下新的技术挑战

**1. Kubernetes Ingress controller**

![9.png](https://static.apiseven.com/logo/20210203/9.png)

APISIX Ingress Controller 基于 APISIX, 集成 Kubernetes 的集群管理能力，支持使用 YAML 申明的方式动态配置入口流量的分发规则、绑定插件，并且支持服务发现、配置校验等能力。APISIX Ingress Controller 将配置写入 APISIX，由 APISIX 承载业务流量。

APISIX Ingress Controller 除了覆盖 NGINX Ingress Controller 已有的能力外，还解决了一些 Nginx Ingress Controller 的痛点。目前该项目已捐给 Apache：[https://github.com/apache/apisix-ingress-controller](https://github.com/apache/apisix-ingress-controller) 。

| &nbsp;              | **APISIX Ingress Controller**           |
| ------------------- | --------------------------------------- |
| **所属**            | Apache 基金会                           |
| **架构**            | 基于 Apache APISIX                      |
| **动态路由**        | 原生支持                                |
| **二次开发难度**    | 简单，基于 Lua 插件或插件编排（低代码） |
| **自定义 RPC 协议** | 容易                                    |
| **性能**            | 高                                      |

**2. Service Mesh**

服务网格是企业内部服务的治理方案。目前通行的方案是 istio + Envoy 的组合。但这个组合也会有很多性能和通用性上问题。

支流科技基于 Apache APISIX，给出了更简洁、更通用的服务网格解决方案。

![10.png](https://static.apiseven.com/logo/20210203/10.png)

**3. 架构演变**

下图是后端服务架构演变史，APISIX 助力企业完成数字化转型，统一技术栈，降低企业开发、维护成本。开源，不锁定企业用户，建立公开、透明的 IT 市场，让企业用户专注于业务需求自身。

![11.png](https://static.apiseven.com/logo/20210203/11.png)

## 写在最后

伴随着社会数字化的趋势，企业用户数字化、智能化、开放化转型已是大势所趋，行业信息系统的全面转型也是势在必行。“驱动企业数字化转型，协助企业管理并可视化 API 和微服务等关键业务流量，通过大数据和人工智能（AI）加速企业业务决策”，这是支流科技使命。
