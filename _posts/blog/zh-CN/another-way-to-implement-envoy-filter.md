---
title: "Envoy 与 Apache APISIX: filter 的另一种实现方式"
avatar: ""
date: 2020-12-16
---

## Envoy filter 现状

### 关于 Envoy

Envoy 是由 lyft 开源的可编程边缘和和服务代理，并捐赠给CNCF基金会。在云原生时代，Envoy 被广泛地使用，在服务网格中，Istio、亚马逊 AWS App Mesh 等都使用Envoy作为默认数据面。

### Envoy Filter 机制

Envoy 是面向服务架构设计的L7代理和通信总线，核心是一个 L3/L4 网络代理。可插入 Filter 链机制允许开发人员编写 Filter 来执行不同的代理任务并将其插入到主体服务中。

![Envoy filter](https://static.apiseven.com/filters.png)

### 扩展方式

现有的 Filter 可能无法满足用户的个性化需求，这时候就需要对 Envoy 进行功能扩展，通过在现有的过滤链基础上自定义新的 Filter，实现定制化需求。
用户可以通过以下三种方式对 Envoy 进行扩展：


|       | Getting Started difficulty |  stability   | development efficiency |          Deploy and compile          |
| :---: | :------------------------: | :----------: | :--------------------: | :----------------------------------: |
|  C++  |            high            |    stable    |          low           |         long time to compile         |
|  Lua  |            low             |    stable    |          High          | no need to compile, deploy directly  |
| WASM  |        high-medium         | on the fence |  depends on language   | compilation time depends on language |

1.  编写 C++ 代码扩展
   
这种方式直接在 Envoy 基础上编写 C++ 代码进行功能增强，实现自定义的 filter 之后，重新编译新的二进制可执行文件，完成现有业务的升级替换。这种方式有以下两方面问题：
- 受限于 C++ 语言，入门的难度，开发者稀缺。
- 提高了部署、运维、升级的复杂性，Envoy将会变得越来越重，并且每次更改都需要重新编译二进制文件，不利于迭代和管理。

2. 使用 lua 脚本扩展

Lua 天生就是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能，被广泛应用。

HTTP Lua Filter 允许在请求和响应流程中运行 Lua 脚本，目前支持的主要功能包括：对传输的请求或响应流，提供头部、正文和尾部的检查；对头部和尾部进行修改；对上游主机执行异步HTTP调用；直接执行响应并跳过后续的过滤器等。

目前很多人配置中直接分发 Lua 代码，不利于代码组织管理，也难以与其他人共享形成生态。


3. 使用 WASM 扩展

用户可以使用自己擅长的编程语言编写 filter，并使用工具编译成 WASM 格式，嵌入到 Envoy 中运行。

它目前支持相对较少的语言，而且使用这些语言来扩展开发仍然不是那么简单。另一方面很多人对 WASM 仍然持保留态度，不会直接投入使用。

## Apache APISIX 解决方案

[Apache APISIX](https://github.com/apache/apisix) 是一个动态、实时、高性能的 API 网关，基于 Nginx 网络库和 Lua 实现， 提供负载均衡、动态上游、灰度发布、服务熔断、身份认证、可观测性等丰富的流量管理功能。
基于以上分析，我们可以看到 Lua 是很适合用来扩展 Envoy ，而且它简单易学，开发效率极高，因为嵌入到 Envoy 中，没有额外的网络等开销，性能表现不俗。
Apache APISIX 基于 Lua 提出了自己的解决方案，那就是提供一个强大而灵活的基础库，实现将 Apache APISIX 的所有插件以及未来会开发的插件运行的 Envoy 上，用户也可以基于此基础库开发自己的个性化插件。


### 示例

具体的代码实现和运行请查看仓库：[https://github.com/api7/envoy-apisix](https://github.com/api7/envoy-apisix)

其中 Envoy 的主要配置如下：

定义 Filter

```yaml
http_filters:
- name: entry.lua
  typed_config:
    "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.Lua
    source_codes:
      entry.lua:
        filename: /apisix/entry.lua
```

对路由启用 Filter，并使用 metadata 进行配置

```yaml
routes:
- match:
    prefix: "/foo"
  route:
    cluster: web_service
  typed_per_filter_config:
    envoy.filters.http.lua:
      "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.LuaPerRoute
      name: entry.lua
  metadata:
    filter_metadata:
      envoy.filters.http.lua:
        plugins:
        - name: uri-blocker
          conf:
            rejected_code: 403
            block_rules:
            - root.exe
            - root.m+
```

### 实现原理

我们无需对 Envoy 进行大幅修改，只需要进行部分优化。

我们在插件层屏蔽平台差异，所有需要使用的接口都抽象在了底层框架，我们称之为 apisix.core ，这样所有插件就可以同时运行在 Envoy 和 Apache APISIX 上。


![Architecture diagram](https://static.apiseven.com/main.png)

我们以前面的示例来展示整个插件运行过程是怎么样的

![Plugin workflow](https://static.apiseven.com/workflow.png)

**第一步，读取配置**

我们通过 metadata 进行配置，决定每个路由上需要运行什么插件，以及插件的配置是什么。

示例中，我们对前缀为 /foo 的路由配置了 uri-blocker 插件以及它的 block 规则和需要 block 时响应的 status 。

**第二步，读取客户端请求数据**

我们进行了封装，将客户端请求数据统一封装到 ctx 中，以便在整个流程中都可以直接使用。

**第三步，运行插件**

我们通过匹配配置的规则和获取到的 uri 来确定是否需要 block 此次请求，如果需要 block ，则调用 respond 直接响应，否则放行。

## 未来展望

越来越多 APISIX 插件可以运行在 Envoy 上，最后实现在 Envoy 上运行 APISIX 所有及未来开发的所有插件。
同时，我们希望未来能与 Envoy 社区一起，在 Lua Filter 方向发力，优化和完善 Lua Filter ，增强 envoy 扩展能力，降低 Envoy 扩展难度。
