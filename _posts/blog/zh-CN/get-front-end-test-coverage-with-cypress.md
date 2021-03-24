---
title: "使用 Cypress 获取前端测试覆盖率"
avatar: "https://avatars.githubusercontent.com/u/31329157?s=460&u=e81b4bb4db2be162c1fcac6d188f5b0f82f71920&v=4"
author: "孙毅"
href: "https://github.com/LiteSun"
date: 2021-03-02
---

## 背景

在[《使用 Cypress 让产品持续稳定交付》](stable-product-delivery-with-cypress)文章中，我们讨论了为什么选用 Cypress 作为 E2E 测试框架。在花了近两个月时间完善测试案例后，我们需要测试覆盖率来量化测试覆盖是否足够。本文将介绍如何使用 Cypress 获取 APISIX Dashboard 前端 E2E 覆盖率。

## 什么是代码覆盖率

代码覆盖是软件测试中的一种度量，描述程序中源代码被测试的比例和程度，所得比例称为代码覆盖率。测试代码覆盖率一定程度上反映了代码的健康程度。

## 安装依赖&配置

想要收集测试覆盖数据，我们需要将原有的业务代码放一些探针以供 Cypress 收集数据。

Cypress 官方推荐两种方式，第一种是通过 nyc 生成临时目录，把已经写入探针的代码运行起来以收集测试覆盖数据。第二种方法是通过代码转换管道实时做代码转换，这就少去了临时文件夹烦恼，使得收集测试覆盖率数据比较清爽。我们选择第二种方式收集前端 E2E 覆盖率。

1. 安装依赖

```shell
yarn add  babel-plugin-istanbul --dev
```

2. 安装 cypress 插件

```shell
yarn add  @cypress/code-coverage --dev
```

3. 配置 babel

```ts
// web/config/config.ts
extraBabelPlugins: [
    ['babel-plugin-istanbul',  {
      "exclude": ["**/.umi", "**/locales"]
    }],
  ],
```

4. 配置 Cypress code coverage 插件

```javaScript
// web/cypress/plugins/index.js
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config);
  return config;
};
```

```javaScript
// web/cypress/support/index.js
import '@cypress/code-coverage/support';
```

5. 获取测试覆盖率

配置完毕后，需要我们运行测试案例，在测试案例运行结束后，Cypress 会生成 coverage 和
.nyc_output  文件夹，里面包含测试覆盖率的报告。

![1.png](https://lh4.googleusercontent.com/o-tyQagmCjprpNkuTjMFLaALZKtW4pyC9nj-GcPx4MM3xK0zrMED9Nndk5ZmZkZsQ5SIJPEovcrHyjWP2YXtEcYYDpLL49aV_97N83doTkOuMXlFsVjGu53A9FdlxOCr6i3aIDTA)

执行下面的命令后测试覆盖率信息会出现在控制台。

```shell
npx nyc report --reporter=text-summary
```

![2.png](https://lh4.googleusercontent.com/n0CON1WF64wEnh3IYEc3wwwOJ2Ft_WmMLfkhOPKIKxoW0NP6Eq8VplJ87EepL5zIWOeyfJhlDmhc3ImE0ivgRlXWe1RuW2x7vL_JEri7Mz6b3tOY0it8bVvUe83CAHNgeoyXZnsy)

在coverage 目录下，会有更详细的报告网页，如图所示：

![3.png](https://lh4.googleusercontent.com/skjR9YUcbmeytfoYnR0it7Vfc7mheCJDt7PSUsp549IbOdfqskTrIOqUXw01e0fnuNwpGoo3GtqAER3eQjNoTIdmU7HY6hc_sZ5NYc3h-MyxqmVz_NaC3AM-J4rWJFy-9IoTWjpn)

+ Statements 表示是否每个语句都执行了

+ Branchs 表示是否每个if代码块都执行了

+ Functions 表示是否每个函数都调用了

+ Lines 表示是否每一行都执行了

## 总结

测试覆盖率的高低一定程度上反映了项目的质量。目前 APISIX Dashboard 前端 E2E 覆盖率已经达到了 71.57%, 我们将持续协同社区，继续增强测试覆盖率，为用户提供更可靠稳定的产品。
