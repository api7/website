---
title: "From 0 to 1: Apache APISIX's Apache Way"
avatar: "https://avatars.githubusercontent.com/u/26448043?s=460&u=9a51a2ee99658ea30918952675fdffeca8b5dc4c&v=4"
author: "Wen Ming"
href: "https://github.com/moonming"
date: 2019-12-26
---

Apache APISIX is a very young project, open source in June this year, joined the CNCF Panorama in July, and entered the Apache Incubator in October, so I will share with you how APISIX went from 0 to 1 and entered the Apache Incubator.

Apache APISIX now has 17 committers, from 16 different companies, and is a very community-based project. Each committer has one vote and decides on major things like release, election of new committers and PPMC.

### **Apache Way**

The Apache Way is a concept we're all familiar with: community over code. Bad code can be changed, and Apache's mentors don't coach you on how to write higher level code, they care more about whether the community is healthy and growing, and as long as there is a good community, bad code will be refactored to better code by higher level people. So as long as the community is there, the project will survive, and that is the most important thing in Apache.

Mailing list priority is another important point, those that have not appeared in the mailing list are treated as non-existent. This is actually a very big challenge in China, people don't like to use emails very much culturally and habitually: firstly, the time is not timely enough, maybe 1-2 days after sending an email to receive a reply; secondly, many things in the mailing list are public, some people like to chat privately; thirdly, only English can appear inside the mailing list, but actually Chinese people's English is not bad, we are much better than most other countries' English. After all, we have learned English for many years, and there are various translation software, even if there are grammatical errors, it is not a big problem.

The third is elite governance, where everyone in the Apache community contributes to gain more voice, and higher titles mean more commitment and responsibility.

The fourth is democracy, everyone can participate in the Apache vote, even if you are not in the Apache community, but not everyone's vote is valid. For example, when APISIX entered the Apache Incubator, I could vote for the project, but I had to write no binding afterwards to indicate that I supported and followed the project, but I was an observer, but this vote was not decisive for whether the project could enter Apache. Only those who have contributed to the incubator and are recognized by the community, i.e., the PMC of the Apache incubator, their votes are valid, which is the democracy of the Apache community.

### **Governance model for open source communities**

We know that many open source projects are under foundations and some are not. Projects under foundations, such as the Linux Foundation and the Apache Foundation, have a governance model called "community consensus", which requires a discussion within the community and a vote after reaching a consensus, rather than a direct vote. If there is no discussion and consensus, then the vote is meaningless. This efficiency may be very slow, but only when the whole community reaches a consensus, there will be no dissent behind.

The second one is the commercial company consensus, as long as the people of the commercial company reach a consensus, then the PR or feature can be merged, and the community's voice is useless because it is a project controlled by the commercial company, and if you contribute code to the commercial company, the decision to be merged is in the hands of the commercial company. This may not matter to individual developers, but it does to the companies involved in the project. Usually companies have private versions, and they want to contribute their features back to the community, but the commercial companies may reject them because they conflict with their own commercial versions.

The third kind is the benevolent dictator, most typically Python, where the individual decides on the development of open source projects.

The above are the three models of open source communities, if it is a business to choose a project, in general we will recommend Apache, Linux Foundation projects, it is first in the legal is no hidden danger, and secondly it is a community consensus, we can contribute to the community this way to get more say, so that a virtuous circle is formed.

### **How to get into the Apache Incubator**

Apache now has close to 50 incubator projects, of which 10 are from China. APISIX is now the only project from a domestic startup to enter Apache, while many others are from large companies such as Huawei, Ali, and Baidu.

The following terms and steps need to be understood in order for a project to enter the Apache Incubator:

+ Champion: He is the introducer of your project, which is the most important role you need to reach out to first, and he needs to be familiar with you and the project.
+ Mentor: The project's mentor, after the project enters the Apache Incubator, Champion transforms into the role of a mentor. The Mentor will guide the project from a project in the incubator to a top-level Apache project, including releasing Apache versions, brand management, growing the community, and so on. If it becomes a top-level project, then the project will be community autonomous.
+ Proposal: After finding Champion and Mentor, the next step is to write a Proposal, i.e. a proposal that introduces who I am, what problems I solve, why I want to join Apache, whether the project's current code files conflict with the Apache license, who the initial committers are, what companies they come from, whether there are any potential risks, how to develop later, etc.
+ Discuss: Then a discussion email will be initiated to see how many people are interested in this, and some interested PMCs can be found to join the Mentor mentoring program at this stage.
+ Vote: Finally, there is a vote, and if the vote passes, the project can enter the Apache incubator.

### **Apache Way and the clash of domestic open source culture**

The Apache project in China will encounter many different challenges, which are related to the open source environment and culture at home and abroad.

For example, domestic engineers will feel too busy, often 996 overtime, so there is no time and energy to do open source. But in fact, many engineers in the work will also use to open source projects, write open source projects feature, but they do not take the initiative to submit PR, and will not write code before the community to initiate discussions, which is a lot of cultural differences.

In terms of communication, Apache advocates open discussion in the mailing list, but many developers in China prefer non-public ways to communicate, such as WeChat, QQ, and phone. Especially if the PPMC of a project is mostly from the same company, a feature may be finalized during the morning meeting, but it does not appear in the mailing list, which is not in line with Apache's culture.

Regarding voting, many developers may feel that their English is not good or people are weak, and they are reluctant to express their opinions on the mailing list and do not participate in voting. Then they will be ignored in the end. So you need to accumulate some "contributions" to help others and slowly increase your influence. Apache is a foundation composed of individuals. Everyone's behavior represents only oneself, not the company. Each PMC's vote is equal.

Regarding Title, in Apache, the highest position is called Apache Foundation Chair, and the manager of each project is VP, then PMC (Project Management Council), Committer, Contributor, who has a similar path to our corporate title promotion. But in Apache, even if your position becomes high, it doesn't mean you have more voting power, it's more of an obligation, for example, for the Apache APISIX vote to elect a new committer, the incubator chair's vote and my vote are the same. Title is more of an honor in Apache. The Apache Foundation is a non-profit organization that emphasizes contribution, and that's where the culture clashes.

### **Copyright issues**

Copyright is a very important issue, and the Nginx author arrests that happened a while ago were due to copyright issues. Before a project can officially join the Apache Incubator, all committers and companies have to sign a CLA stating that they will donate all the copyright of the project to the Apache Foundation. After joining the Apache Incubator, the most important milestone is the release of the first Apache release, which is to clear up the risks in the license so that users can use it with confidence. Therefore, commercial companies are guaranteed to use Apache's projects without the problem of unclear copyright.

Finally, Apache APISIX is an open source project that is rapidly evolving, I hope you will participate and contribute more, Thanks.
