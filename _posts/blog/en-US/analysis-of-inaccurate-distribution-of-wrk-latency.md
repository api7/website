---
title: "Analysis of inaccurate distribution of wrk latency"
avatar: "https://avatars.githubusercontent.com/u/26448043?s=460&u=9a51a2ee99658ea30918952675fdffeca8b5dc4c&v=4"
author: "Wen Ming"
href: "https://github.com/moonming"
date: 2018-09-03
---

![1.jpg](https://pic4.zhimg.com/80/v2-596a56dceaf120f846ce07484e4c091b_1440w.jpg)

Title picture: Photo by Snapwire from Pexels.

wrk is a great HTTP stress testing tool built on top of the open source projects Redis, NGINX, Node.js and LuaJIT, leveraging their strengths in event-driven, HTTP parsing, high performance and flexibility, and the ability to write your own Lua scripts to generate test requests.

Although wrk has no test cases and the author shows up about once a year to merge the code, that doesn't stop us from using wrk as our tool of choice for performance and fuzz testing. If you're still using multi-threaded ab, it's well worth trying wrk.

---

The following is the statistical portion of the delay distribution from the wrk results.

    Latency Distribution
     50%    1.20ms
     75%  595.78ms
     90%  899.11ms
     99%    1.00s

This example means that 50% of requests are completed in 1.2ms, 90% of requests are completed in 899 ms, and 99% of requests are completed in 1s.

When we used wrk to stress test our own product, we found that most of the requests in wrk's latency statistics were completed within a few milliseconds, but a small percentage of requests had a latency of over 100 milliseconds. For a system built with OpenResty, it is not very scientific to have such a large latency.

While the final solution to this problem was very simple, the specific analysis and positioning was a bit convoluted and took several days. The final solution is not important; it is the process and the way of thinking about the problem that is of interest.

---

*When we encounter latency problems, our first reaction is that there is a blockage somewhere in the code or the system*. Since the system is complex, we offer up **flame charts**.

There is no ready-made systemtap script to analyze this kind of problem, so it took some time to write one. However, after tweaking the systemtap script several times, no significant delay was captured, which is clearly inconsistent with the wrk results. We guessed that the script might not be perfect and might have missed some functions that were not hooked. But we also have doubts about the correctness of the wrk results.

*We turn around and try to pinpoint whether the wrk statistics are wrong, or whether it is indeed a server problem*. We dumped all the packets from the crush test on the server where wrk is located, sorted them by time spent, and were surprised to find that the results were very different from wrk's latency statistics, with no requests exceeding 100 milliseconds. I repeated the above test several times and the results were consistent.

---

Now the goal is clear, just smooth out wrk's code about delay statistics. The biggest worry is that there is a bug in wrk's internal statistics, which is not easy to fix, after all, it is a project without any test cases.

We went through the wrk statistics logic and added logs at the beginning and end, and were relieved to find that the statistics about the delay were correct. But before printing the final results, there is a `statistic correction` code.

    if (complete / cfg.connections > 0) {
        int64_t interval = runtime_us / (complete / cfg.connections);
        stats_correct(statistics.latency, interval);
    }

According to this if judgment, whenever piezometric data is generated, it will be corrected. If you are interested, you can take a look at the code of `stats_correct` function, it's only 10 lines, and I didn't understand it even after reading it several times.

Check the code commit record again, there may be something, but only the following line, and did not understand: the

    remove calibration & improve CO correction

Under Tucao, if the submission record is a little more detailed, without abbreviation, or adding a code comment, you can save a lot of things.

The problem has been checked here, and it can be confirmed that it is not a product problem, and the solution is already there, which is to comment out the corrected code above. But there must be a reason why the wrk author deliberately added it, and not understanding the reason is always a hidden problem. Naturally, I had to open an issue to ask the author, and wg, who showed up once a year, gave a reply 15 days later, and it turns out that the abbreviation `CO` in the above commit info refers to `Coordinated Omission`, and gives an article dedicated to this problem, interested students can use this keyword Interested students can search by themselves with this keyword.

Simply put, `Coordinated Omission` means that when doing stress testing, it is not enough to count only the time between sending and receiving a reply, this refers to `service time`, which will miss a lot of potential problems, and the waiting time of the test request also needs to be counted, in order to be considered as `response time` that users care about.

Gil Tene, who proposed the CO problem, also made a modification to wrk to specifically address the CO problem: [https://github.com/giltene/wrk2](https://github.com/giltene/wrk2), and the README for this project There are some explanations of this in the project's README, which you can read if you are interested, so I won't mention it here.

---

For our own product, there is certainly no blocking in the code, and when doing stress tests, it is running the CPU full. Even if there is blocking, there is a flame chart to sample and analyze. So the simple and brutal correction wrk makes here for Coordinated Omission is rather misleading.
