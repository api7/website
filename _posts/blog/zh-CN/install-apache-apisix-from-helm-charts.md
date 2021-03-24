---
title: "使用 Helm Charts 安装 Apache APISIX"
avatar: "https://avatars.githubusercontent.com/u/10428333?s=460&u=f48ef50c5621a1616a3ede50221547e34270e061&v=4"
author: "张超"
href: "https://github.com/tokers"
date: 2021-02-26
---

<!-- markdown-link-check-disable -->

日前[支流科技](https://www.apiseven.com/)提供了一个在线 Helm Charts 仓库 https://charts.apiseven.com, 用户可通过该仓库轻松安装 Apache APISIX、Apache apisix-dashboard 和 Apache apisix-ingress-controller （而不需要提前 clone 对应的项目）。

## 如何使用

只需通过以下几步即可安装 Apache APISIX 2.1 版本。

1. 添加仓库并获取更新

   ```
   $ helm repo add apisix https://charts.apiseven.com
   $ helm repo update
   ```

<!-- markdown-link-check-enable -->

2. 查看仓库中可用的 Charts 包

   ```
   $ helm search repo apisix

   NAME                    CHART VERSION   APP VERSION     DESCRIPTION
   apisix/apisix           0.1.2           2.1.0           A Helm chart for Apache APISIX
   apisix/apisix-dashboard 0.1.0           2.3.0           A Helm chart for Apache APISIX Dashboard
   ```

3. 安装 Apache APISIX 到目标 Kubernetes 集群中

   ```
   $ helm install apisix-gw apisix/apisix --namespace default

   NAME: apisix-gw
   LAST DEPLOYED: Fri Feb 19 11:34:14 2021
   NAMESPACE: default
   STATUS: deployed
   REVISION: 1
   TEST SUITE: None
   NOTES:
   1. Get the application URL by running these commands:
    export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services apisix-gw-gateway)
    export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
    echo http://$NODE_IP:$NODE_PORT
   ```

## 另请参阅

- https://github.com/apache/apisix-helm-chart
