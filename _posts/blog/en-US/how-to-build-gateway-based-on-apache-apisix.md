---
title: "BEKE: How to build a gateway based on Apache APISIX"
avatar: ""
author: "Wang Hui"
href: ""
date: 2020-12-11
---  

I'm Wang Hui and I'm in charge of API gateway system development at BEKE. We use Apache APISIX as the API gateway for our production system, which handles over 100 million production traffic every day with excellent performance and stability. APISIX just joined the Apache Incubator, so besides congratulations, I'd like to share why we chose Apache APISIX in the first place and what we learned during the process of using it.

## Choose Kong or APISIX?

![1.png](https://static.apiseven.com/2020/05/1588752135-Snipaste_2020-05-06_16-02-04.png)
![2.png](https://static.apiseven.com/2020/05/1588756665-Snipaste_2020-05-06_17-17-29.png)
![3.png](https://static.apiseven.com/2020/05/1588756618-Snipaste_2020-05-06_17-16-13.png)

For the technical requirements of the gateway, one is to have good performance and be able to support high traffic access, and the other is to be stable and not to have problems.

The principle of selection is based on or borrowed from open source projects to reconstruct a more robust version, to ensure access to greater traffic, the beginning of the traffic is still small, it is perfectly acceptable to do such a big move. After evaluating the pros and cons and the leadership table to communicate the idea, the leadership of the decision to get up, the first thing on the mind is Kong, the famous open source gateway. So go to the official website to browse some of the surrounding articles also read some, the first impression is that this project is very good, this feature supports that feature is also supported, to meet the user thought not thought of most of the needs, performance is also stable, it is it. I was so excited to clone the code and start reading it, but after a day or two or several days, I was still confused, and thought about it, Kong can provide so many features, the complexity of its code can be imagined.

Several questions came to my mind at this point: How long would it take for me to chew up Kong alone? And then how long will it take to build a project that works for me? And is there so much functionality that I need?

In a dark and windy night, the QQ group rang, a message from Wen Ming and @ all, API gateway APISIX 0.5 version released, what is this? The next day I contacted Wen Ming and learned that this was an open source project he had worked on with Yuan Sheng. The appearance of APISIX at this juncture let me see a new choice, the most important two are the industry's big brother, the code quality should be fine, is too short open source time.

I started to approach APISIX with the attitude of giving it a try, and first took a brief look at the documentation. Due to the short open source time, the features supported are limited, but there are quite a few, such as dynamic load balancing, fusion, authentication, speed limit, etc. The amount of code is not very large to reduce the learning cost, at this point PK dropped Kong, APISIX is more suitable for my current situation, to meet my initial functional planning, and do not have to consider how to deal with the problem of unwanted features.

The next thing to look at is the focus, open source time is so short, how is the performance? After looking at the crush test data of the same environment, APISIX blows Kong away, although this is not fair, after all Kong is a huge thing, but for my production environment, they are the same. According to APISIX's performance test report, the single-core CPU can reach 24k QPS while the latency is only 0.7 ms.

I finally chose APISIX for the following reasons.

+ Low learning costs for APISIX, provided that all project requirements are met
+ Kong has a large amount of code and can be difficult to maintain later
+ APISIX authors are often active in the OpenResty community, and code quality is guaranteed
+ The most important point is to have contact with the author, what problems can be quickly communicated

The official website justification is shown below.

![4.png](https://static.apiseven.com/2020/05/1588756618-Snipaste_2020-05-06_17-16-13.png)

## What capabilities does APISIX offer?

+ Hot updates and hot plugins
+ Dynamic Load Balancing
+ Active and Passive Health Testing
+ Fuse
+ Identification
+ Speed limit
+ gRPC Protocol Conversion
+ Dynamic TCP/UDP, gRPC, websocket, MQTT proxy
+ Console
+ Black and White List
+ Serverless

APISIX has been released for nearly ten versions now, and it supports much more than that. The architecture has been mapped out in relation to the business situation as follows.

![5.png](https://static.apiseven.com/2020/05/1588756665-Snipaste_2020-05-06_17-17-29.png)

## Integrating APISIX in bits and pieces

After a few days of code reading, I had a certain understanding of APISIX and was ready to start working on it, but the first problem arose: I had no previous experience in developing based on open source projects, so I had to iterate on business requirements on the one hand, and upgrade open source projects on the other. I created three local branches, an APISIX branch pointing to the upstream open source repository, dev for regular business iterations, and master branch for online upgrades.

After two weeks of tapping on the keyboard, my "Little King Kong" finally has some shape, so it's time to see how fast it runs and whether it saves fuel. The service is deployed on top of the 8CPU 32G memory Tencent Cloud, the upstream is a real online production environment, so you can not press too hard, the performance report is as follows.

![6.png](https://static.apiseven.com/2020/05/1588756713-Snipaste_2020-05-06_17-18-13.png)

Performance Report Summary: The interface took 47% less time, no errors were generated stability was improved, TPS peak was increased by 82%, and the service was relatively more stable.

APISIX supports various installation postures: docker, rpm packages, Luarocks and source code. However, the online environment does not allow anything to be installed, and the code can only be placed in a fixed path, and many of the features supported by APISIX are based on OpenResty 1.15.8, so how can we do that? After compiling, I put it in the code repository, and compile it according to the specified directory, and I can't use the static linkage of pcre, so it took a couple of days to fix it. It took a couple of weeks to adjust the load and start graying out, and it took a couple of weeks to go from 2% traffic to full volume, but everything went well.

After a few weeks of observation the online service is very stable, APISIX 0.5 version of many functions have to be implemented through API interface calls, request parameters are more prone to syntax errors, not as intuitive and convenient as the page, another point is that my business scenario needs to have a live probe function for upstream services. It's such a coincidence that APISIX 0.7 was released, and version 0.7 supports console and upstream service probing, so it's really a good news to upgrade.

APISIX branch upgrade to 0.7 is very convenient, how do I merge the code? The two versions of code changes are very large, first try to merge, my God, this conflict is too much, screw the rhythm ah, the ordinary method of conflict resolution is not realistic, so many places a shaky hand will also appear a little hidden bug, there is no efficient method? I searched and found the shortcut methods git checkout --ours and git checkout --theirs (if you haven't used them, you can search for them yourself), and I was able to finish the upgrade from APISIX 0.5 to 0.7 in a few minutes, which was very fast. Of course, this is also due to the robustness of APISIX code, I only need to add business plugins, completely zero coupling.

Version 0.7 provides a console, no longer have to spell json, comfortable. At first, there was no problem, I could clearly perceive the state of the upstream service, but I observed the logs of the upstream service and found that after several starts and stops, the frequency of health detection seemed to have become faster, so there should be a bug in health detection. I found that the checker of each route created is not globally unique, but each work created one, found that the problem is good to do, the work created with a name will be able to ensure that the global unique, although the changes are very small, but still rushed to submit a PR.

I was happy to upgrade my online business APISIX to 0.7, and then I observed the service resource usage for a couple of hours, after all, it was a larger version. When I took a look again after work, it seemed that the memory resource usage was not quite right. 0.5 version had been relatively stable, but 0.7 seemed to have leaks because the memory usage was growing very slowly, so I decided to observe it again overnight. The next day, we compared the monitoring data and determined that there was a memory leak, so we hurriedly rolled back to the previous version. After I gave some feedback to the faculty, I found out the problem through pressure testing according to the scenario I described, and it was a problem with radixtree.

0.7 version still gave me some surprises, the previous 0.5 version used the routing dependency is libr3, 0.7 is replaced by radixtree, compared with the previous better performance, cpu usage and memory have been reduced, 0.5 version single work cpu in 1-10%, memory 0.1%, 0.7 The cpu usage of 0.5 single work is 1-2% and memory is less than 0.1%, excellent.

## What we have to do afterwards

APISIX has been running online for two months now, and we haven't had any online failures yet, so I'm glad. This is just the beginning, we can do a lot more and show more capabilities to our service providers. The gateway provides more than just a reverse proxy, it can help some teams that don't have more energy to develop stable service features, including flow limiting, fusing, monitoring and other services, as well as access to the platform. Finally, thanks to the two big brothers to provide such an excellent product, is that the console is a little bit lame, welcome front-end students to add bricks and mortar.

Now the daily traffic of the gateway has exceeded 100 million, there is no performance problem, if the traffic can reach one billion level, the follow-up will share again Apache APISIX and my road ahead, welcome your attention.

Click on "[Read the original article](https://apisix.apache.org)", go to the project home page of Apache APISIX.
