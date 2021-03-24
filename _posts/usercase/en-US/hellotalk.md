---
title: "HelloTalk: A Global Exploration Path Based on OpenResty and Apache APISIX"
avatar: ""
author: "Li Ling"
href: ""
date: 2020-05-07 
---  

<div style="text-align: center">
  <video controls src="https://opentalk-blog.b0.upaiyun.com/prod/2019-12-19/fe6c7e341b5ee7ae72473de56ef0fd3b.mp4" style="width: 100%"></video>
</div>

**Lecturer Profile**

Li Ling, head of back-end technology at HelloTalk, Inc., focuses on services going overseas and the architecture of Golang/CPP-based IM services and related technology platforms. More than 5 years of OpenResty development and use experience, Apache APISIX Committer.

>On December 14, 2019, UPYUN and Apache APISIX community held API gateway and high performance service best practices丨OpenTalk Guangzhou event, HelloTalk, Inc. backend technical leader Li Ling gave a speech titled "HelloTalk's OpenResty-based Globalization Exploration Road".

![1.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/dcdd21fb8248a73fb79edd59b50146e2)

The following is the full text of the sharing.

Hello everyone, I am Li Ling from HelloTalk, this time I will introduce what HelloTalk does and how to use OpenResty and Apache APISIX based on the scenario.

## HelloTalk: technically a global Tiny version of WeChat based on

HelloTalk is the world's largest social community for foreign language learning. 16 million users around the world learn 150 foreign languages, conduct cross-cultural communication and make friends through HelloTalk and Global Language Partners. Users are widely distributed in China, Japan, South Korea, the United States, Europe, Brazil and other countries, of which 80% are overseas users. From a technical point of view, HelloTalk is a Tiny version of WeChat based on the world.

![2.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/638f50106e81c9d99eb788d4c1d3e9c1)

HelloTalk has many KOL users overseas to help promote it on YouTube, Instagram, Twitter and other platforms, so it has a high reputation. The product takes into account the functions of chatting, error correction and translation, and users can change text by voice while chatting. Among them, voice to text and translation support more than 100 languages.

From the operation level, many companies don't know how to do the first step when they go abroad, and they face the same problem in technology - how to go abroad and provide quality service to global users. In order to make users in each country have a better experience, we have to mention the help from OpenResty.

![3.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/00edd154e43d7d22b0cfbc20ae26f0ac)

As shown in the figure above, HelloTalk users are scattered, and we need to find the best balance to deploy connection nodes in the most cost-effective way. The Asia Pacific region such as Korea and Japan, and the Yangtze River Delta and Pearl River Delta in China have a relatively concentrated distribution of users and are relatively easy to handle, but in other regions where users are highly dispersed (such as Europe, Africa, and the Middle East in the above figure), it poses a higher challenge to provide a stable and reliable service.

## Why use OpenResty

Early HelloTalk using C++ to write IM services, at that time is the use of a major manufacturer of high-performance network framework, the protocol is internal formulation, HTTP protocols are rarely used. This is a very high cost for small companies, assuming that the internal writing service should be exposed to external use, but also need to develop their own Proxy Server, and the latest addition of the command word to do adaptation, which is very troublesome.

So from 2015, HelloTalk started to introduce OpenResty, based on OpenResty in the front to do proxy, direct protocol conversion to internal services, reducing a lot of costs.

In addition, the service is simply exposed for external use and will require the functionality of a WAF. Some of our early APIs were based on PHP, and often some vulnerabilities were found due to the framework, leading to various injections and attacks by hackers, the main technique of which was to POST various PHP keywords or carry PHP keywords in the URL.

We solved this problem by adding very little code (based on regularity) to OpenResty, and later found that even with the addition of WAF functionality, there was not much loss in performance.

+ **TLV：0x09 + Header(20 bytes) + Body + 0x0A**

In the early days of IM development, we all wanted short and concise protocols, so HelloTalk's protocol header is also relatively concise, all TCP protocol bodies. What is more interesting is to define the middle content by adding two special byte symbols before and after, namely 0x09 + Header(20 bytes) + Body + 0x0A, which can basically ensure that the packet will not be messed up. If there are no two packets before and after 0x09 and 0x0A, in fact, there is still a certain probability that the wrong packet will be generated.

![4.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/4016aa821d2739e943508231d132bbbe)

+ **Custom protocol -> HTTP development costs, the urgent need for efficient proxy services to do protocol conversion**

![5.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/ee08f6237b70218ca6ce17c187ecce94)

In the early days, HelloTalk used the TLV + PB protocol model. At that time, the business was growing rapidly and needed to change to external restful + JSON, so the first step was to convert PB to JSON.

And there is a problem with doing protocol parsing: OpenResty uses the PBC parser written by Yunfeng, and it is very troublesome to write the parsing, you have to know the structure of the inner layers. Suppose the structure has three layers, you have to write three layers of judgment code and throw it out layer by layer. But then we found that Apache APISIX is based on lua-protobuf, so we also changed to use the lua-protobuf library, which can directly convert a PB object into JSON, which is very convenient.

+ **Security Analysis of TCP Protocol based on cosocket**

![6.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/872061737c4c7634dd5d0bcbf8a05831)

The process of parsing protocols is basically to keep reading the socket, read the Length field in the packet header in the above figure, and then read the body segment, where you can see that you have to implement the protocol parsing is more troublesome, because you have to do adaptation for each protocol.

+ **Quickly implement a Web IM**

After we finished our C++ IM communication service, we saw that mainstream IM apps such as WhatsApp and WeChat have Web IM, and we quickly implemented a WebIM version of HelloTalk from the server side based on OpenResty's compatibility and modification of their protocols in about two weeks.

![7.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/a0e113a7e01a800ffe319762841a4266)

The same as the WeChat web version scan login chat, basically no changes to the protocol, only add a layer of OpenResty in the middle to do WebSocket protocol conversion.

+ **Control message frequency**

The public service, if exposed, will have people sending messages to all of them frequently, so we need to do message limiting, which is done directly based on resty.limit.req, and of course API frequency control is also done.

+ **WAF protects PHP business**

![8.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/cd1d59bb1367622b3034bca4dc2de821)

If you've done PHP development, you should know that all the intrusions are actually various injections of PHP function names and keywords. But after I put all the PHP function names in the WAF, I never found any attacks, but I found a lot in the logs, which means that they were all blocked and couldn't reach PHP.

![9.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/66d9182a76c290270de3b1f8f3c9b9dd)

Three steps.

1. Rapid implementation of pure TCP protocols.
2. Openresty-based exposure of HTTP services.
3. API Gateway (Apache APISIX) plus Golang Microservices Development and Governance.

## Challenges and issues in the internationalization process

+ HelloTalk users are very scattered, so we need to find a solution to the problem of scattered users.
+ About 20% of HelloTalk users in the country face the problem of firewall.
+ The overseas language environment is as complex as the online environment, and language adaptation issues are difficult to handle.

### **How to improve the quality of global access for users**

I have compared the solutions offered by many service providers in the market.

1. Aliyun Global Acceleration (BGP + dedicated line) is a direct 4-layer acceleration.
2. Aliyun DCDN full site acceleration.
3. AWS' Global Accelerator program.
4. Ucloud's XPath solution.
5. Dedicated service (VPC on both ends, dedicated line in the middle, https offloaded at the edge).
6. Zenlayer.

But we need to consider two issues: cost, and real quality of service.

![10.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/1dc8e5d4ed17b1cedd8034e21891910c)

In solving the cross-border problem, since we have to consider 20% of domestic users and the geographical location of the company's headquarters, we are based on Aliyun site-wide acceleration, originally all with a public proxy to Hong Kong Aliyun, using the two sides of the VPC, the middle of the dedicated line form, but sometimes encounter the problem of dedicated line network jitter resulting in increased latency, so in Shenzhen to do based on the OpenResty-based gateway proxy in Shenzhen. The actual situation is: if the private line does not work, choose to go to the public network, the public network delay is about 14ms, the private line is 4ms.

Upstream detection is involved here, and the need to quickly switch to another line when the line is not working is based on the Resty library provided by UNYUN.

Hong Kong Ali machine room to Hong Kong Tencent Tencent machine room feel is actually in the same area, because we test the delay is about 0.3ms ~ 0.4ms.

For other overseas users, basically all are directly accelerated back to Hong Kong Ali, but direct acceleration will lead to the client's network quality is seriously affected by geographical problems, so we set up some failover mechanism to protect the user's experience.

### **Access line control and traffic management**

+ Stability due to dedicated network, e.g. Europe to Hong Kong, latency: 244 ms -> 150 ms.
+ Dynamic upstream control (lua-resty-healthcheck), flexible switching between multi-service provider lines to ensure service reliability.
+ Part of the logic can be processed directly at the edge, serverless (the principle is based on pcall + loadstring implementation), serverless piece we are now transforming it into Apsche APISIX + ETCD.

### **Access nodes and quality control**

![11.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/217e7a308fdd8254065df74178f6257e)

HelloTalk access nodes are currently located in the eastern United States, Frankfurt, Singapore, Tokyo, and Hong Kong. The United States directly to Hong Kong may not be able to, at this time will be in accordance with the established mechanism through Germany and then back to Hong Kong, Japan and South Korea is also back to Hong Kong. Brazil also has a lot of users, but the Brazilian cloud vendors only AWS in doing, basically all connected to the United States, if not connected will also be multiple lines to choose between. This link is actually done by cloud vendors or CDN vendors, but we actually found that there are always some regions that do not do well, so in order to ensure that the user experience is not damaged, we have to have some failover mechanisms to ensure that multiple service providers switch between them to ensure that the user service is reliable.

### **Choice of 7-tier and 4-tier acceleration**

Many service providers will offer Layer 7 acceleration and Layer 4 acceleration, but there will be some issues to resolve.

+ **Layer 4 acceleration: SSL handshake time is too long, easy to fail, can't get the client's IP, not convenient to do node quality statistics.**

![12.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/40e0434fee917090a23ea52d197b979a)

Layer 4 acceleration does not get the IP of the client, (Note: some cloud vendors are supported but need a patch on the server), it provides this feature in the package of TCP, and is not very friendly, if the patch goes wrong, who will be responsible for this?

In addition, monitoring quality has also become a problem, we need to know which line works, which line does not work, although there is a switching mechanism, but we need to know its real communication route. In fact, we will run with the real IP at each traffic layer proxy, if we use AliCloud, then AliCloud will help us fill into a head inside, and constantly bring the real IP of the client to the next node.

+ **Layer 7 acceleration: IM services cannot be guaranteed to require long connections to keep messages arriving reliably**

The problem with 7-layer acceleration is that it makes the IM service mechanism become long polling or short connection rotation mechanism, but in practice we found that it is more traffic-consuming, and IM service needs long connections to keep the messages reliable and arrive in time, but most 7-layer acceleration vendors do not support WebSocket, and individual support WebSocket support for the edge of the vendor offload HTTPS and very expensive, especially foreign ones like AWS is very expensive. In addition, if a cloud vendor's edge node goes down, it will have a relatively poor impact on users, so we have done a lot of failover logic design (built-in IP mechanism) on the clients between multiple cloud vendors, so that once the failure can effectively guarantee switching to another node to ensure connection quality.

### **Management solutions for global access in multi-cloud environments**

+ Support websocket with 7 layers of acceleration. (cloud service + self-built)
+ Build your own low-rate VPC + dedicated channel. (Cost-effectiveness considerations, IM itself does not have much traffic, only for notification message delivery)
+ Mixed long and short connections for sending and receiving messages: websocket + long polling + httpdns + built-in IP failover mechanism.

![13.jpg](https://opentalk-blog.b0.upaiyun.com/prod/2020-01-08/5f2064f82680dd2653aa547ad0019e90)

Of course, which IP is built into the client is also a problem, for example, for European users, in fact, we must allocate the European IP, then first of all, our server side to store the European server IP, how to store? When? Here we use Tencent Cloud's httpdns + openresty timer mechanism to allocate, cache and update the IP in the above figure is the user's real IP, and this time the httpdns service provider will do the IP resolution of the domain name according to the IP parameters. 

## From Building Your Own API Gateway to Deeper Experience with Apache APISIX

### **Build your own API Gateway to achieve camouflage dynamics**

In the early days, we changed nginx.conf directly, and I myself felt that a bare nginx would have the highest performance. But the problem was that many people didn't always remember the priority order rules for Location assignment, and we often changed them wrong. We also had fixed requirements: dynamically updating SSL certificates, locations, and upstreams, which was similar to the ingress update mechanism of K8S now, i.e., generated via a template: nginx_template.conf + JSON -> PHP -> nginx.conf -> PHP-cli -> Reload to achieve dynamism. However, this solution can be considered to be replaced after encountering Apache APISIX.

### **Apache APISIX becomes HelloTalk's choice**

+ Self-imposed requirements are relatively simple, and reliance on RDMS feels too heavy and brings additional maintenance costs.
+ The code is extremely simple and easy to understand, within one's ability to comprehend.
+ ETCD-based, saving maintenance costs.
+ The main maintainer of the project is almost online in real time, and the QQ group and email are responsive.

That's all I have to say today about HelloTalk's global exploration based on OpenResty.

[pdf download](https://opentalk-blog.b0.upaiyun.com/prod/2019-12-14/a461592d41242046fa76ff72a948f0e7.pdf)
