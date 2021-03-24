---
title: "HelloTalk：基于 OpenResty 和 Apache APISIX 的全球化探索之路"
date: 2020-05-07 
avatar: ""
author: "李凌"
href: ""
---  

<div style="text-align: center">
  <video controls src="https://opentalk-blog.b0.upaiyun.com/prod/2019-12-19/fe6c7e341b5ee7ae72473de56ef0fd3b.mp4" style="width: 100%"></video>
</div>

**讲师简介**

李凌，HelloTalk,Inc. 后端技术负责人，专注服务出海和基于 Golang/CPP 的 IM 服务及相关技术平台的架构，5 年以上 OpenResty 开发和使用经验，Apache APISIX Committer。

>2019 年 12 月 14 日，又拍云联合 Apache APISIX 社区举办 API 网关与高性能服务最佳实践丨OpenTalk 广州站活动，HelloTalk, Inc. 后台技术负责人李凌做了题为《HelloTalk 基于 OpenResty 的全球化探索之路》的分享。

![1.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/dcdd21fb8248a73fb79edd59b50146e2)

以下是分享全文：

大家好，我是来自 HelloTalk 的李凌，本次主要介绍 HelloTalk 做什么业务以及基于怎样的场景使用 OpenResty 和 Apache APISIX。

## HelloTalk：技术上看是基于全球的 Tiny 版微信

HelloTalk 是全球最大的外语学习社交社区，全球 1600 万用户通过 HelloTalk 和全球语伴学习 150 门外语、进行跨文化交流及交友。用户广泛分布中国、日本、韩国、美、欧、巴西等国家，其中海外用户占 80%，从技术角度来看 HelloTalk 是一个基于全球的 Tiny 版微信。

![2.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/638f50106e81c9d99eb788d4c1d3e9c1)

HelloTalk 海外有很多 KOL 用户在 YouTube、Instagram、Twitter 等平台协助做推广，知名度较高，产品兼顾聊天、改错、翻译等功能，用户可以边聊边语音改文字。其中语音改文字和翻译支持 100 多种语言。

从运营层面看，很多企业出海时不知道怎样去做第一步，技术上也同样面临这个问题——如何做到出海，并且为全球用户提供优质的服务。为了让每个国家的用户都能拥有更好的使用体验，这里就要不得不提到 OpenResty 给我们带来的帮助了。

![3.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/00edd154e43d7d22b0cfbc20ae26f0ac)

如上图所示，HelloTalk 的用户分布很散，我们需要找到最佳的平衡点，以性价比最优的方式部署连接节点。亚太区域如韩国、日本，中国长三角和珠三角等地用户分布比较集中，比较好处理，但是在用户高度分散的其他地区（如上图的欧洲、非洲、中东），对提供稳定可靠的服务提出了较高的挑战。

## 为什么使用 OpenResty

早期 HelloTalk 使用 C++ 写 IM 服务，当时是用到某大厂的高性能网络框架，协议都是内部拟定的，HTTP 协议都很少用。这对小公司而言成本很高，假设内部写服务要曝露给外部使用，还需要自己开发 Proxy Server，而最新加的命令字要做适配，这就非常麻烦了。

所以从 2015 年开始，HelloTalk 开始引进 OpenResty，基于 OpenResty 在前面做代理，直接进行协议转换传到内部服务，减少了很多的成本。

此外，服务简单暴露给外部使用，会需要 WAF 的功能。我们早期有些 API 是基于 PHP 实现的，经常会因为框架原因被发现一些漏洞，导致一些黑客做各种注入和攻击，其中主要的手法就是 POST 各种 PHP 的关键字，或者在 URL 里面携带 PHP 关键字。

当时我们在 OpenResty 里添加很少的代码（基于正则）后解决了这个问题，后来发现即使增加 WAF 功能，性能上也不会有太大的损失。

+ **TLV：0x09 + Header(20 bytes) + Body + 0x0A**

早期我们做 IM 开发都希望协议短小精悍，HelloTalk 的协议头也比较精简，全部是 TCP 的协议体。比较有意思的是通过前后加两个特殊的字节符号，定义中间的内容，即 0x09 + Header(20 bytes) + Body + 0x0A，基本上可以保证数据包不会出乱。如果没有前后 0x09 和 0x0A 两个包，其实还是有一定概率会产生错包的。

![4.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/4016aa821d2739e943508231d132bbbe)

+ **自定协议 -> HTTP 的研发成本，急需高效的 proxy 服务做协议转换**

![5.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/ee08f6237b70218ca6ce17c187ecce94)

早期 HelloTalk 采用 TLV + PB 的协议模式，当时业务正快速发展，需要改成对外的 restful + JSON，第一步要做的是 PB 转 JSON。

而做协议解析遇到一个问题：OpenResty 使用的是云风写的 PBC 解析器，解析写起来非常麻烦，必须要知道里层的结构。假设结构有三层，你得写三层判断代码，一层一层地把它抛出来。但后来发现 Apache APISIX 是基于 lua-protobuf，所以我们也改成了用 lua-protobuf 库，它可以直接把一个 PB 对象直接转成了 JSON，非常方便。

+ **基于 cosocket 的 TCP 协议安全解析**

![6.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/872061737c4c7634dd5d0bcbf8a05831)

协议的解析过程基本上是不断地读 socket，读到上图中的包头里的 Length 字段，再去读 body 段，这里可以看出自己要实现协议解析比较麻烦，因为要对每个协议做适配。

+ **快速实现一个 Web IM**

我们当时做完 C++ 的 IM 通讯服务后，看到主流的 IM App 如 WhatsApp、微信都有 Web IM，我们很快的基于 OpenResty 对他们的协议进行兼容和改造，大概两周时间，我们就从服务端快速实现了一个 WebIM 版本的 HelloTalk。

![7.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/a0e113a7e01a800ffe319762841a4266)

和微信网页版本一样扫描登录聊天，基本不对协议做改动，只在中间添加一层 OpenResty 做 WebSocket 协议转换。

+ **控制消息频率**

公共服务如果暴露出去，会有人频繁地给所有的人发消息，因此我们需要做消息限流，这是直接基于 resty.limit.req 做的，当然 API 频率控制也是如此进行的。

+ **WAF 保护 PHP 业务**

![8.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/cd1d59bb1367622b3034bca4dc2de821)

做过 PHP 开发应该知道，所有的入侵其实是各种注入 PHP 的函数名字、关键字。但当我把所有的 PHP 的函数名全放在 WAF 后，我再也没发现过被攻击，但在日志里发现很多，这说明全部被拦截了，到不了 PHP 那边。

![9.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/66d9182a76c290270de3b1f8f3c9b9dd)

三步走：

1. 纯 TCP 协议快速实现；
2. 基于 Openresty 的 HTTP 服务暴露；
3. API网关（Apache APISIX） 加 Golang 微服务开发和治理。

## 国际化过程中的挑战和问题

+ HelloTalk 用户分布区域非常分散，需要想办法解决用户分布区域分散的问题；
+ HelloTalk 国内大概有 20% 的用户，面临防火墙的问题；
+ 海外语言环境和网络环境一样复杂，语言适配问题难以处理。

### **怎样提高用户的全球接入质量**

我比较过市面上很多服务商提供的方案：

1. 阿里云全球加速 (BGP + 专线)，直接就是 4 层加速。
2. 阿里云 DCDN 全站加速。
3. AWS 的 Global Accelerator 方案。
4. Ucloud 的 XPath 方案 。
5. 专线服务（两端 VPC，中间专线，边缘卸载 https）
6. Zenlayer。

但我们需要考虑两个问题：成本，真正的服务质量。

![10.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/1dc8e5d4ed17b1cedd8034e21891910c)

在解决跨境问题时，由于要考虑到国内 20% 的用户和公司总部地理位置，所以我们是基于阿里云全站加速展开，原本是全部用公网代理到香港阿里云，采用两边是 VPC、中间专线的形式，但有时候会遇到专线网络抖动导致延时提高的问题，所以在深圳做了基于 OpenResty 的网关代理。而实际情况是：如果专线不通就选择走公网，公网延时大概 14ms，专线是 4ms。

这里会涉及到上游检测，线路不通时需要快速的切换到另外一条线路，这部分问题是基于又拍云提供的 Resty 库在解决。

香港阿里机房到香港腾讯腾讯机房感觉其实是在同一个区域，因为我们测试延时大概在 0.3ms～0.4ms。

对于海外其他用户，基本全部是直接加速回到香港阿里，但直接加速会导致客户端的网络质量受地域问题影响严重，所以我们设置了一些 failover 的机制来保障用户的使用体验。

### **接入线路控制和流量管理**

+ 专线网络的带来的稳定性，例如欧洲到香港，延时: 244 ms -> 150 ms；
+ 动态 upstream 控制 (lua-resty-healthcheck)，多服务商线路之间灵活切换，保证服务的可靠性； 
+ 部分逻辑可以直接在边缘处理，serverless（原理都是基于 pcall + loadstring 实现），serverless 这块我们现在正则将其改造成 Apsche APISIX + ETCD。

### **接入节点和质量把控**

![11.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/217e7a308fdd8254065df74178f6257e)

目前 HelloTalk 的接入节点主要分布在：美国东部，法兰克福，新加坡，东京，香港。美国直接到香港有可能会不通，此时会按照既定机制经转德国再回到香港，日本和韩国也是回到香港。巴西也有很多用户，但巴西云厂商只有 AWS 在做，基本上全部是连到美国，如果连不通也会多个线路之间做选择。这个环节其实是云厂商或者是 CDN 厂商完成，但实际发现总有一些地区做的并不好，所以为了保证用户体验不受损，我们得有些 failover 机制保证多个服务商之间切换，保证用户的服务是可靠的。

### **7 层和 4 层加速的选择**

很多服务商会提供 7 层加速和 4 层加速，但也会有一些问题需要解决。

+ **4 层加速：SSL 握手时间过长，容易失败，得不到客户端的 IP，不方便做节点质量统计。**

![12.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/40e0434fee917090a23ea52d197b979a)

4 层加速得不到客户端的 IP，(注：有些云厂商是支持的但需要在服务器上打个补丁)，它在 TCP 的包里提供了此功能，也不是很友好，如果打补丁出了问题，谁来负这个责任呢？

此外，监控质量也成了问题，我们需要知道哪条线路行、哪条线路不行，虽然有切换机制，但我们要知道它真实的通讯路线。事实上我们在每个流量层代理时都会把真实 IP 带着跑，如果采用阿里云，那阿里云会帮我们填到一个头里面去，不断地把客户端的真实 IP 带给下一个节点。

+ **7 层加速：不能保证 IM 服务需要长连接保持消息的可靠到达**

7 层加速的问题在于使得 IM 服务机制变成了 long polling 或者是短连接轮循机制，但在实际过程中我们发现它比较耗流量，而且 IM 服务需要长连接保持消息的可靠和及时到达，但大部分 7 层加速厂商不支持 WebSocket，个别支持 WebSocket 的厂商边缘卸载 HTTPS 又很贵的，尤其是国外的像 AWS 挺贵的。此外，如果云厂商边缘节点宕机，会对用户造成比较差的影响，因此我们就在多个云厂商之间的客户端做了很多 failover 逻辑设计（内置 IP 机制），一旦故障能够切实保障切换到另外一个节点，保证连接质量。

### **多云环境下的全球接入的管理方案**

+ 支持 websocket 的 7 层加速。(云服务+自建)
+ 自建低速率的 VPC + 专线通道。(性价比考虑，IM 自身流量并不多，只做通知消息下发）
+ 长短连接混合收发消息：websocket + long polling + httpdns + 内置 IP failover 机制

![13.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/5f2064f82680dd2653aa547ad0019e90)

当然内置哪个 IP 到客户端也是一个问题，比如对于欧洲用户，其实肯定是要分配欧洲的 IP，那么首先我们服务端要把欧洲的服务端 IP 存起来，怎么存？什么时候存？这里我们是通过腾讯云的 httpdns + openresty timer 机制分配、缓存、更新的，上图中的 IP 就是用户的真实 IP，这个时候 httpdns 服务商就会根据 IP 参数做域名的 IP 解析。 

## 从自建 API Gateway 到深入体验 Apache APISIX

### **自建 API Gateway 实现伪装动态化**

我们早期是直接改 nginx.conf，我自己觉得裸的 nginx 性能肯定是最高的。但问题是很多人不一定记得 Location 配制的优先级顺序规则，我们也经常会改错。而且我们的需求比较固定：动态更新 SSL 证书、Location、upstream，当时的做法类似现在的 K8S 的 ingress 更新机制，即通过模本生成：nginx_template.conf + JSON -> PHP -> nginx.conf -> PHP-cli -> Reload 来实现动态化。但这个方案在遇到 Apache APISIX 之后可以考虑替换掉了。

### **Apache APISIX 成为 HelloTalk 的选择**

+ 自身需求比较简单，依赖 RDMS 觉得太重，带来额外的维护成本；
+ 代码极致简单易懂，在个人能力范围内，可以理解；
+ 基于 ETCD，节省维护成本；
+ 项目主要维护者几乎实时在线支持，QQ 群、邮件响应及时。

以上是我今天就 HelloTalk 基于 OpenResty 的全球化探索之路的全部分享，谢谢！

[pdf下载地址](https://opentalk-blog.b0.upaiyun.com/prod/2019-12-14/a461592d41242046fa76ff72a948f0e7.pdf)
