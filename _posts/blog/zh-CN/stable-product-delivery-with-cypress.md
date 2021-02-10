---
title: "使用 Cypress 让产品持续稳定交付"
date: 2021-02-07
---

作者：[孙毅](https://github.com/LiteSun)

## 背景

Apache APISIX Dashboard 的设计是为了让用户通过前端界面尽可能方便地操作 Apache APISIX。从项目初始化到现在，已经有 552 commits、发布了 10 个版本。在如此之快的产品迭代过程中，确保开源产品质量显的尤为重要。为此，我们引入了 E2E 测试模块以确保稳定的产品交付。

## 什么是前端 E2E

E2E，是“End to End”的缩写，可以翻译成“端到端”测试。它模仿用户操作行为，从某个入口开始，逐步执行操作，直到完成某项工作。完善的测试可以防止代码改动时破坏原有的逻辑。

## 为什么选择 Cypress

我们在选型调研期分别使用 Taiko、Puppeteer、TestCafe 、Cypress 书写创建路由的测试案例，通过使用每个测试框架书写案例，来体会其各自的特点。

Taiko 的特点是具有 smart selector, 可以根文字内容、位置关系智能定位想要操作的元素 ，上手成本也比较低，能够很快的完成测试案例。但是，在书写测试案例时并不友好，当用户误操作退出终端后，所书写的测试案例也全部丢失。如果想要完整地运行测试案例，还需要配合其它的 test runner 一起使用，这无疑又增加了用户的学习成本。

Puppeteer 具有最好的性能表现。但是，测试并不是 Puppeteer 的重点。它被广泛用于网页爬虫。我们的项目起初使用的是 Ant Design 官方推荐的 E2E 测试框架即 Puppeteer ，使用了一段时间后发现 Puppeteer 对非前端开发者不是那么友好，很难让其他用户参与进来。当用户编写测试案例时，缺少智能元素定位的功能加持使得用户学习曲线很高。

TestCafe 的安装简单程度令人惊喜，它具有内置的等待机制，用户不用主动的去 sleep 等待页面交互，并且支持多浏览器并发测试，这对多浏览器兼容性测试很有帮助。缺点是它的调试过程并不是那么友好，每次测试案例更改后都要从新跑一遍用例。对于开发人员而言，要有一定的 Javascript 语法基础。其次，它的运行速度相对于其它几个框架而言比较慢，尤其是执行 withText() 查找元素时。

综合比较后，我们最终选用了 Cypress 作为我们的前端 E2E 框架，列出四点主要原因：

1. 语法简单

Cypress 测试所使用的语法非常简单，而且容易阅读和书写。稍加练习后，就能掌握创建测试案例，这对于开源项目来说是很重要的，因为这样可以让社区里有兴趣参加 E2E 测试案例的用户以最低的学习成本参与到书写测试案例中。

2. 易于调试

在调试测试用例时，我们可以使用 Cypress 的 Test Runner。Test Runner 可以展示多维度的数据，通过这些信息，我们可以快速定位到问题所在。

- 展示用例执行状态，包括成功、失败、运行中的个数；
- 展示整个测试集执行的总时间；
- 内置 Selector Playground 可以帮助定位元素；
- 展示了每一个用例的每一个执行步骤，并形成快照，在执行完毕后，可以把每一个执行步骤的信息展示出来；

3. 社区活跃

Cypress 有一个庞大的用户社区，社区里面总是有很多人在分享他们的经验和主意。

这在遇到问题时很有帮助，你很有可能遇到别人在之前就已经遇到的问题。另外，当有新的功能需求时，我们也可以参与到社区，通过讨论，把自己想加入的特性加入到 Cypress 中，就像我们 Apache APISIX 社区做的事一样：听取社区的意见并反哺社区。

4. 文档清晰

Cypress 的文档结构更加清晰全面。在使用初期，我们根据官方文档指引很快的就能把 Cypress 引入到我们的项目中并书写第一个案例。此外，在其文档站中，有大量的文档可供参阅，这会给用户很好的指引，会让用户知道怎么样做才是最好的实践。

## Cypress 与 APISIX Dashboard

目前 APISIX Dashboard 已经书写 49 个测试案例。我们在 GitHub Action 中配置对应的 CI，确保每次合并代码前测试通过以保证代码质量。我们参考 Cypress 的最佳实践并结合我们的项目，和大家分享一下 Cypress 在 APISIX Dashboard 的使用。

![图片](https://static.apiseven.com/202102/apisix-dashboard-e2e.gif)

![图片](https://static.apiseven.com/202102/image.png)

1. 常用的功能封装成命令。

以登录为例，登录是进入系统必不可少的环节, 我们把登录环节封装成命令，这样，在每次运行案例之前，进行登录命令调用。

```javascript
Cypress.Commands.add("login", () => {
  cy.request(
    "POST",
    'http://127.0.0.1/apisix/admin/user/login',
    {
      username: "user",
      password: "user",
    }
  ).then((res) => {
    expect(res.body.code).to.equal(0);
    localStorage.setItem("token", res.body.data.token);
  });
});
```

```javascript
beforeEach(() => {
  // init login
  cy.login();
});
```

2. 将 selector 和 data 提取成公共变量。

为了让用户更直观理解测试代码的含义，我们将 selector 和 data 抽成公共变量。

```javascript
const data = {
  name: "hmac-auth",
  deleteSuccess: "Delete Plugin Successfully",
};
const domSelector = {
  tableCell: ".ant-table-cell",
  empty: ".ant-empty-normal",
  refresh: ".anticon-reload",
  codemirror: ".CodeMirror",
  switch: "#disable",
  deleteBtn: ".ant-btn-dangerous",
};
```

3. 移除 cy.wait(someTime)

我们在使用 Cypress 的前期使用 cy.wait(someTime)，但在使用中发现，cy.wait(someTime) 过度依赖网络环境以及测试机器的性能，当网络环境或者机器性能差时，会导致测试案例报错。推荐的做法是配合 cy.intercept() 使用以明确指定需要等待的网络资源。

```javascript
cy.intercept('https://apisix.apache.org/').as('fetchURL');
cy.wait('@fetchURL');
```

## 总结

目前 APISIX Dashboard 已经书写 49 个测试案例。未来，我们将持续增强前端 E2E 覆盖率，在社区中约定每次提交新的特性或者 bugfix 都需要书写对应的测试案例以保证产品的稳定性。

欢迎大家加入我们一起打磨世界级的网关产品。

项目地址：[https://github.com/apache/apisix-dashboard](https://github.com/apache/apisix-dashboard)
