---
title: "Apache APISIX Ingress Controller 中的流量切分"
avatar: "https://avatars.githubusercontent.com/u/10428333?s=460&u=f48ef50c5621a1616a3ede50221547e34270e061&v=4"
author: "Chao Zhang"
href: "https://github.com/tokers"
date: 2021-03-27
---

流量切分（traffic split）是指将流量按照定义好的规则和比例分摊到多个后端服务，像常见的 API 网关产品（例如 [Apache APISIX](https://apisix.apache.org/)，[Traefik](https://traefik.io/)）、服务网格 Sidecar Proxy（例如 [Envoy](https://envoyproxy.io/)，[linkerd2-proxy](https://github.com/linkerd/linkerd2-proxy)），都提供了流量切分的功能，以此来实现细粒度的 [金丝雀发布](https://blog.getambassador.io/cloud-native-patterns-canary-release-1cb8f82d371a)，[蓝绿部署](https://martinfowler.com/bliki/BlueGreenDeployment.html) 等功能。

作为 [Kubernetes](https://kubernetes.io/) 集群流量入口，[Ingress Controller](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/) 自然也需要支持流量切分的功能，在后端应用需要发布时，能够提供逐步切流，回滚的能力，降低应用发布带来的风险。本文先后介绍了 [Ingress Nginx](https://kubernetes.github.io/ingress-nginx/) 和 [Kong Ingress Controller](https://github.com/Kong/kubernetes-ingress-controller) 中提供的流量切分功能（有时也称为金丝雀发布），之后介绍了流量切分在 [Apache APISIX Ingress Controller](https://github.com/apache/apisix-ingress-controller) 中的实现。

（注：为了描述方便，下文用术语 “灰度应用” 表示命中金丝雀发布规则后对应的后端应用和术语“稳定应用”表示金丝雀发布规则未命中时对应的后端应用。例如，在下图中，灰度应用是 “foo-canary”，稳定应用是 “foo”。）

![1.png](https://lh6.googleusercontent.com/E_qq-RFIcVBbTFsI8-QTNH7Io5vOXapdQUaAzKE2mYlyvtXUlZEoSd8aVMHAppARmXx9_wgHsgP1CWK_R74MfPV58dLQ71kEcU57DooHKz2LuKb6D6TW9B2_C8rLsm8wHTk2_zZt)

## Ingress Nginx

[Ingress Nginx](https://kubernetes.github.io/ingress-nginx/) 提供了[金丝雀发布](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#canary)的功能，我们可以为 [Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/) 资源添加 nginx.ingress.kubernetes.io/canary: “true” 注解来启用该功能，Ingress Nginx 支持使用以下几个注解来自定义金丝雀发布的规则。

+ nginx.ingress.kubernetes.io/canary-by-header

通过某个请求头的值来判断流量应该被转发到灰度应用（值为 always）还是稳定应用（值为 never）。

+ nginx.ingress.kubernetes.io/canary-by-header-value

该注解扩展了 nginx.ingress.kubernetes.io/canary-by-header，通过判断指定请求头的值是否与该注解的值匹配，来决定流量的去向（匹配则转发到灰度应用，否则转发到稳定应用）。

+ nginx.ingress.kubernetes.io/canary-by-header-pattern

该注解和 nginx.ingress.kubernetes.io/canary-by-header 类似，只是匹配采用了 [PCRE](https://www.pcre.org/) 兼容的正则表达式。

+ nginx.ingress.kubernetes.io/canary-by-cookie

通过 Cookie 中某个字段的值来判断流量应该被转发到灰度应用（值为 always）还是稳定应用（值为 never）。

+ nginx.ingress.kubernetes.io/canary-weight

为灰度应用设定一个大小位于 [0, 100] 的权重，流量将按照权重在灰度应用和稳定应用之间分配。权重为 0 则所有流量都会被转发到稳定应用；权重为 100 则所有流量都会被转发到灰度应用。

下图的例子将携带 User-Agent 头部匹配 “.*Mozilla.*” 模版，URI path 前缀为 /get 的请求转发到灰度应用 foo-canary。

```
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  annotations:
      kubernetes.io/ingress.class: nginx
      nginx.ingress.kubernetes.io/canary: "true"
      nginx.ingress.kubernetes.io/canary-by-header: "User-Agent"
      nginx.ingress.kubernetes.io/canary-by-header-pattern: 
".*Mozilla.*"
  name: ingress-v1beta1
```

## Kong

Kong 提供了金丝雀发布的[插件](https://docs.konghq.com/hub/kong-inc/canary/0.32-x.html)，并且通过 [KongPlugin](https://docs.konghq.com/kubernetes-ingress-controller/1.1.x/references/custom-resources/) 这个 CRD 资源将该功能暴露到了 Kong Ingress Controller 中。管理员/用户首先需要创建一个 KongPlugin 对象，填入金丝雀发布的规则，然后在目标 [Kubernetes Service](https://kubernetes.io/docs/concepts/services-networking/service/) 中加入注解 konghq.com/plugins 并赋予该对象的名称；亦或是创建一个 [KongClusterPlugin](https://docs.konghq.com/kubernetes-ingress-controller/1.1.x/guides/using-kongclusterplugin-resource/) 对象，进而使得该插件在集群内生效。

```
apiVersion: configuration.konghq.com/v1
kind: KongPlugin
metadata:
  name: foo-canary
config: 
  percentage: 30
  upstream_host: foo.com
  upstream_fallback: false
  upstream_port: 80
plugin: canary
---
apiVersion: v1
kind: Service
metadata:
  name: foo-canary
  labels:
    app: foo
  annotations:
    konghq.com/plugins: foo-canary
spec:
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
    name: http
  selector:
      app: foo
      canary: true
```

上述例子将 foo-canary 这个服务标记为灰度应用，并为其建立了一条金丝雀发布规则，要求 30% 的流量转发到该应用。

## Apache APISIX

[Apache APISIX](https://apisix.apache.org) 提供的 [traffic-split](apisix.apache.org/docs/apisix/plugins/traffic-split) 插件支持配置自定义规则进行流量切分。Apache APISIX Ingress Controller 在此基础之上，结合 [ApisixRoute](apisix.apache.org/docs/ingress-controller/concepts/apisix_route) 灵活的路由规则配置，将流量切分实现为了 [ApisixRoute](apisix.apache.org/docs/ingress-controller/concepts/apisix_route) 中的第一类功能（无须通过注解定义）。

### 基于权重

基于权重的流量切分可以通过为单条路由规则配置多个 Kubernetes Service 后端来实现，如：

```
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixRoute
metadata:
  name: foo-route
spec:
  http:
  - name: rule1
    match:
      hosts:
      - foo.org
      paths:
      - /get*
    backends:
    - serviceName: foo-canary
      servicePort: 80
      weight: 10
    - serviceName: foo
      servicePort: 80
      weight: 5
```

上述示例将 ⅔ 的满足 Host 为 foo.org，URI path 前缀为 /get 的请求转发到了 foo-canary 这个 service，剩下 ⅓ 的请求将被路由到 foo。

在实际应用中，可以为灰度应用设定较小的权重，进行小规模的验证，确认没有问题后修改 ApisixRoute 资源，逐步放大其权重，最终将流量全部转发到该灰度应用，完成发布。

### 基于规则

ApisixRoute 资源允许用户添加路由匹配表达式 - [Exprs](https://github.com/apache/apisix-ingress-controller/blob/master/docs/en/latest/concepts/apisix_route.md#advanced-route-features) 字段，来自定义路由匹配；此外，单个 ApisixRoute 资源允许插入多条路由规则，因此基于规则的流量切分被 Apache APISIX Ingress Controller 以一种无缝的方式集成。

```
apiVersion: apisix.apache.org/v2alpha1
kind: ApisixRoute
metadata:
  name: foo-route
spec:
  http:
  - name: rule1
    priority: 1
    match:
      hosts:
      - foo.org
      paths:
      - /get*
    backends:
    - serviceName: foo
      servicePort: 80
  - name: rule2
    priority: 2
    match:
      hosts:
      - foo.org
      paths:
      - /get*
      exprs:
      - subject:
          scope: Query
          name: id
        op: In
        set:
        - "3"
        - "13"
        - "23"
        - "33"
    backends:
    - serviceName: foo-canary
      servicePort: 80
```

上述示例，将满足 Host 为 foo.org，URI path 前缀为 /get 的请求，分为两部分：

+ id 参数是 3、13、23、33 其中之一，这部分请求将命中路由规则 rule2，从而被转发到 foo-canary 这一服务；

+ 其他请求将命中路由规则 rule1，从而被转发到 foo 这一服务。

## 总结

Ingress Nginx 支持基于权重和基于 Header 规则的金丝雀发布，但是需要通过 annotations 的方式进行配置，语义不强；而 Kong 的方案仅支持基于权重进行金丝雀发布，某些场景下无法满足使用需求，且需要多处配置；Apache APISIX Ingress Controller 则较好地同时支持了两种使用场景，并且其提供的路由规则灵活多变，配置简单且易于理解。
