---
title: "API Gateways Apache APISIX and Kong Selection Comparison"
avatar: "https://avatars.githubusercontent.com/u/26448043?s=460&u=9a51a2ee99658ea30918952675fdffeca8b5dc4c&v=4"
author: "Wen Ming"
href: "https://github.com/moonming"
date: 2020-01-18
---

Apache APISIX and Kong are both open source microservice API gateways, so how do you compare and choose between them?

These two projects are covered by complete documentation and tests, and many production users are using them, so don’t worry about stability and their sustainable development. This article will focus on the most direct and verifiable functions and performance. To make a comparison from a different perspective.

These two projects are covered by complete documentation and tests, and many production users are using them, so don’t worry about stability and their sustainable development. This article will focus on the most direct and verifiable functions and performance. To make a comparison from a different perspective.

| **Features**         | **Apache APISIX** | **KONG** |
| :------------------- | :---------------- | :------- |
| **Dynamic upstream** | Yes               | Yes      |
| **Dynamic router**   | Yes               | Yes      |
| **Health check**     | Yes               | Yes      |
| **Dynamic SSL**      | Yes               | Yes      |
| **L4 and L7 proxy**  | Yes               | Yes      |
| **Opentracing**      | Yes               | Yes      |
| **Custom plugin**    | Yes               | Yes      |
| **REST API**         | Yes               | Yes      |
| **CLI**              | Yes               | Yes      |

For a more detailed comparison.


| **Features**                                                    | **Apache APISIX**                                 | **Kong**                |
| :-------------------------------------------------------------- | :------------------------------------------------ | :---------------------- |
| Belongs to                                                      | Apache Software Foundation                        | Kong Inc.               |
| Tech Architecture                                               | Nginx + etcd                                      | Nginx + postgres        |
| Communication channels                                          | Mail list, Wechat group, QQ group, GitHub, meetup | GitHub, freenode, forum |
| Single-core CPU, QPS(enable limit-count and prometheus plugins) | 18000                                             | 1700                    |
| Latency                                                         | 0.2 ms                                            | 2 ms                    |
| Dubbo                                                           | Yes                                               | No                      |
| Configuration rollback                                          | Yes                                               | No                      |
| Route with TTL                                                  | Yes                                               | No                      |
| Plug-in hot loading                                             | Yes                                               | No                      |
| Custom LB and route                                             | Yes                                               | No                      |
| REST API <--> gRPC transcoding                                  | Yes                                               | No                      |
| Tengine                                                         | Yes                                               | No                      |
| MQTT                                                            | Yes                                               | No                      |
| Configuration effective time                                    | Event driven, < 1ms                               | polling, 5 seconds      |
| Dashboard                                                       | Yes                                               | No                      |
| IdP                                                             | Yes                                               | No                      |
| Configuration Center HA                                         | Yes                                               | No                      |
| Speed limit for a specified time window                         | Yes                                               | No                      |
| Support any Nginx variable as routing condition                 | Yes                                               | No                      |

### Performance
After enabling the limit-count and prometheus plug-ins, the performance of Apache APISIX is ten times that of Kong.

Here are more detailed [steps] (https://gist.github.com/membphis/137db97a4bf64d3653aa42f3e016bd01),
Interested developers can follow the picture to verify.

### the reason
Here, we discuss the reasons behind the differences in functionality and performance:
1. The routing complexity of Apache APISIX is O(k), which is only related to the length of uri and has nothing to do with the number of routes; the routing time complexity of kong is O(n), which increases linearly with the number of routes.

2. The time complexity of IP matching of Apache APISIX is O(1), which will not cause CPU resources to run out with a large number of IP judgments.

3. The route matching of Apache APISIX accepts all the variables of Nginx as conditions and supports custom functions; other gateways have several built-in conditions.

4. Apache APISIX uses etcd as the configuration center. There is no single point. If a machine is down arbitrarily, the gateway cluster can still operate normally. Other gateways based on relational databases will have a single point of problem.

5. Apache APISIX configuration can reach all gateway nodes within 1 millisecond, using etcd watch; other gateways poll the database regularly, and it usually takes 5 seconds to get the latest configuration.

6. Apache APISIX plug-ins have been carefully tuned to maintain millisecond-level latency under high pressure.

7. Apache APISIX's unique plug-in arrangement and low-code feature can greatly reduce the threshold of secondary development.
