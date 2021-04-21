---
title: "Apache APISIX: How to implement plugin orchestration in API Gateway"
avatar: ""
date: 2020-12-14
---

<div class="iframeBox">
  <iframe width="100%" height="100%" src="https://www.youtube.com/embed/iEegNXOtEhQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="padding-top: 30px"></iframe>
</div>

First let me introduce myself. I am from China, the co-founder of [apiseven](https://www.apiseven.com), which is a Chinese startup company.  I am the VP and PMC member of the open source project [Apache APISIX](https://github.com/apache/apisix). I am also a committer of Apache skywalking. In addition, I am the founder of the qihoo 360 Open Source Committee, Tencent Cloud TVP, and a TOC member of the TARS Foundation. I have more than 40 security patents.

In today’s topic, I will introduce 4 parts. First, a brief introduction to Apache APISIX. What is Apache APISIX and what can it help us to deal with? The second part is the custom development in the API gateway, and the third part is the plugin in Apache APISIX. How can we automatically generate it? The last part is some thoughts on the future of API gateway.

First of all, let me briefly introduce Apache APISIX. In one sentence, it is a cloud-native API gateway. Here is the repo address of Apache APISIX on github.

Apache APISIX is a very young project. It was open sourced in June last year and donated to the Apache incubator in October. In July this year, he graduated from the Apache incubator and became a top-level project. This is a fast-growing community, it only took nine months.

For developers who are not familiar with Apache APISIX, you can simply think of it as an enhanced version of Nginx, which covers all the functions of Nginx while using Lua
It brings more dynamic features to Nginx, turning Nginx into a very powerful API gateway. The biggest feature of Apache APISIX is that it is fully dynamic, including routing, ssl certificates, plugins, etc. In Apache APISIX, all features are dynamically configured through the admin API, without restart the service at all. In Apache APISIX, users' business needs are all realized by using Lua to develop plugins. APISIX has more than 40 builtin plugins, including identity authentication,  limit rate, limit request, security, log, observability, etc., which basically covers all the features that users may encounter in the enterprise.

So let's take a look at what can Apache APISIX do for you? It can handle Layer 4 and Layer 7 traffic, including HTTP, https, tcp, udp, mqtt, etc.

Because Apache APISIX is based on Nginx, you can naturally use Apache APISIX instead of Nginx to handle north-south traffic. At the same time, Apache APISIX can also handle the traffic between microservices well, so you can use it to replace envoy.
We also have some users who use Apache APISIX as the ingress controller of Kubernetes. At the same time, with the help of Apache APISIX's mqtt plugin, we can use Apache APISIX as an iot gateway, or use IDP plugin to turn APISIX into a zero-trust gateway.
So APISIX is more concerned about the power on the gateway itself. Through plugins, users can turn APISIX into various gateways required by their business.

This is the technical architecture of Apache APISIX. From this we can see that APISIX has two parts, the left one is the data plane, and the right is the control plane.

Let's first look at the data plane. After the user's request is processed through Apache APISIX, it can be passed to private API, public API or partner API. Inside Apache APISIX, plugins are built in a way similar to Lego bricks. You can easily remove or add a plugin without restart the service.

Then Let's look at the control plane. In the control plane, the admin writes the  configurations to the etcd cluster through the admin API, and the APISIX data plane will watch etcd, so that the configurations can reach all data planes within milliseconds. After the nodes of the data plane process the data, they then report some metrics and log data to components such as skywalking, Prometheus, etc.

From this architecture diagram, we can see that APISIX only relies on etcd, and does not have RDS like mysql and postgresql. Therefore, APISIX is better designed for high availability. At the same time, its architecture will be simpler, convenient for deployment and ops.

This picture is the landscape of Apache APISIX. Looking at it from the left, APISIX supports many 4-layer and 7-layer protocols. It not only supports traffic from browsers and mobile apps, but also supports various IoT devices to report traffic to APISIX.

Apache APISIX also supports many external service discovery centers, including etcd consoul.

As a very important infrastructure software, API gateway is generally placed at the entrance of traffic. Therefore, it not only needs to process all requests from client, but also need to connect to some backend services, such as skywalking, datadog, kafka, etc.

At the bottom of this picture, APISIX not only supports running on bare metal, but also on servers in various public clouds. We also support running on ARM platform.

ok, Part 1 is a brief introduction to APISIX, and then in Part 2, I will introduce the development of custom plugins in API Gateway.

Custom development is a very important point when we use open source gateways, and it has a high bar. The gateway is not a software that can be used out of the box. This is different from  database and message queue. MQ and database can be used directly after we install them, but the gateway is not. This is because the gateway More or less custom development is required.

For example, if your company has some old systems, or some special protocols, such as some protocols in the financial and security industry, you need to do some transcode at the gateway level.

On the other hand, although APISIX provides more than 40 plug-ins, it is definitely unable to meet all the needs of the enterprise, because each company has some unique needs. So, we often need to do some custom development of existing plugins to meet our needs. This is actually a big problem, because plugin development still requires more skills. For plugin development, different open source projects have different solutions.

Let's take a look at Kong first. It is a well-known AP gateway project. It's 5 years old. Kong's technology stack is basically the same as APISIX, and both are implemented based on Nginx and Lua. But the technical architecture of Kong is not the same as APISIX. Kong is based on RDS such as postgres and Cassandra. APISIX uses etcd, and the APISIX solution is closer to Kubernetes and cloud native.

The common point of kong and APISIX is that developers need to use Lua to develop plug-ins. Lua is not a popular programming language, and many developers are not familiar with it, although Lua itself is simple. So besides making the plug-in simpler, what better solution is there?

Kong's solution is to support go to write plugins. This approach will attract more go developers to write plug-ins to meet the custom needs of his own company. This is a good idea, but on the other hand, Kong is native implemented based on Nginx and lua, and plugins written in go actually need to call another process, which will have an cross process communication, which has performance issue.

Let's take a look at the second one, which is also a very well-known open source data plane project to process east-west traffic, Envoy, which is wrote in C++. So, Envoy's plug-in is naturally implemented in C++ too. So it's not easy to get started.

Envoy also supports other languages for development. For example, Envoy supports Lua filter, and Lua filter has the same problem as kong, that is, there are few developers familiar with Lua. So Envoy also support WASM, which can attract more other language developers to write plugins. This solution is not perfect, and the stability and performance of WASM still need time to improve.

The solutions of kong and Envoy are the same: they hope more developers have the ability to develop plugins, whether they use go, Lua or WASM. So back to APISIX, we hope to find a silver bullet.

So what does this silver bullet looks like? We think that at the gateway level, the following two problems must be solved first to solve the problem of custom development.

The first one is that many plug-ins that need to be developed are actually simple.  How to reuse the more than 40 open source plug-ins that already exist?

The second is to allow the demand side of the gateway in the enterprise, such as product managers, ops and security team, to implement their own needs on the gateway with as little cost as possible, it will best if not need write any code.

If we can solve these two problems, then we have the opportunity to let more people, not just developers, be able to develop the AP gateway.

First of all, let's look at the first problem is how to solve the reuse of existing plug-ins. Microservices are already a very popular technology, so can we introduce this concept into API gateway plugins?

We can make each plug-in only do one feature, just like a microservice, which is also the same as the design of process in Linux. Therefore, we have proposed a concept called micro-plugin.

Each of our plugins only do an independent feature. Then, we need a design similar to Linux pipe to connect these micro plug-ins.

For example, I first call a uri block plugin. After the call is finished, I will judge whether the uri is really blocked. If it is blocked, then continue to call the Kafka plugin.

Using this pipe method, these plug-ins can be connected. Apache APISIX now has more than 40 plug-ins.The permutation of more than 40 plugins have unlimited possibilities, enough to meet user needs.

But the problem now is that in all API gateways that have been open source, the plug-ins do not share context and cannot cooperate with each other. So we need to connect those plugins together. Only by doing this, We can solve the problem of plug-in reuse with micro-plugins.

The second problem is, after we have the micro-plug-in, how can we reduce the development cost of the API gateway’s new plug-in to zero as much as possible to meet user needs. We hope that for non-developers, that is, those product managers and security who have no technical background and do not know how to program, they can realize their needs without development, because they understand our needs best.

At the same time, this will lower the bar for API gateway development, allowing more and more people contribute to the AP gateway. If we use a slogan, that is "from creativity to creation", we can not only write our own ideas into document for developers, but also directly create a new plug-in.

This sounds like a good idea, so can it be realized? In fact, we can jump out of the technical thinking to see how other industries are solved.

For example, in the process engine of the medical industry, they are built in a GUI way, because their users are doctors. Then, Lego for children is the same. You can use a limited number of building blocks to build an infinite number of possible shapes.

put GUI and Lego ideas together, then we can see that it is actually scratch, which is children learn programming, so the bar will be very low.

Based on the previous two problems we solved, APISIX uniquely proposed a new concept: plug-in orchestration. Here is a demo of the plug-in orchestration, we can take a look at this short video first.

In this video, we first create a uri block plug-in, and then we create a conditional judgment. If the uri block is true, then we will add it to the fault injection plug-in; if the result of the uri block is False, we will pass it to the kafka plugin to record logs.

Then we configure each plug-in and the judgment condition. Finally, let's verify it with curl to see if this new plug-in is really work on the node of the gateway. Yes, it works.

Next, I will explain to you how this plug-in orchestration is implemented. This may also be a technical issue that everyone is concerned about.

To implement plug-in orchestration, we need to take three steps.

In step 1, we need to use DAG to describe this new plugin. We can see that the graph with the arrow on the left is actually a DAG(directed acyclic graph), which is the same as the code described in the previous video. Then this is a description method that is friendly to humans. For the computer, we have to turn it into a description language of a data structure on the right. For example, the number 1 node followed by 2 4 6 means node 1, which points to the second One, the 4th and 6th nodes; the the value of number 3 is nil,  means that there are no other nodes behind the number 3 node, and the others are similar. In this way, we convert a DAG into a data structure description.

After having this data structure, we then convert this data structure into a JSON string, and then pass this JSON string to the server. The JOSN string on the right is converted from the plug-in we saw in the demo.

After step 1, we already have a string described by json, but how do we convert this string into code that can be ran by APISIX?

We know that in APISIX we are running Lua code, so we need  a compiler, to parse json into an AST(abstract syntax tree), and finally generate Lua code. At this time, we used jsonschema to do this step. Below is the open source repository.

After generate the Lua code, we use the APISIX control plane to write the Lua code into etcd through the admin API, and then the APISIX data plane node get the Lua code through watch etcd. APISIX has the ability to dynamically run the Lua code, just like severless plug-in of APISIX.

Therefore, the new plug-in generated by plug-in orchestration, from DAG to the actual running of the data node, the entire process is all dynamic, which is a very important feature of APISIX.

If you see this, do you have a question, where can I try it? Don't worry, there is an open source project here, and we also have an online demo.

In the last part, I want to talk about our thoughts on the future of API gateway.
The API gateway has existed for a long time. There have been many companies and open source projects doing API gateways more than ten years ago. Then in the cloud-native time, API gateway is facing changes in user requirements, and higher requirements are put forward for AP gateways.

One trend is that traditional north-south API gateways begin to process east-west microservice traffic. For example, Nginx has launched Nginx control and Nginx unit. kong and APISIX also act as microservice API gateway.

At the same time,  the east-west service mash project also trying to act the north-south access gateway. So for open source projects, all of them want to process full traffic.

Open source projects about process traffic are blooming, we can see Baidu's bfe and Alibaba's MOSN. They are all focuse on traffic.

The second is low code.  The best solution is PM can directly implement features by plugin orchestration, so that the developers pay more attention to the gateway itself.

In this way, the business and the core of API gateway are decoupled. You can let people who don't understand the technology and plug-in development to contribute plug-ins to open source project. This is very important.

The third point is real time. With the popularization of 5g and iot, and the landing of Kubernetes in the enterprise, it has put forward very high requirements for the real-time effect of configuration, the process of requests, and real-time data analysis. For the gateway, if you cannot real-time, very high performance, and very low latency, then it will be die in the next three to five years.

last but not least, is open source. We can see software is eating hardware, and open source software is eating software. In the end, all the infra software are open source.

The same is true for API gateway. Open source allows companies to use it at a lower cost without worrying about vendor lock-in. Moreover, the commercial opportunity of open source will also bring more to open source developers. This is a good model for a win-win situation.
