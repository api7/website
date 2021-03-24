---
title: "How Amazon EKS and APISIX ingress controller work together to manage complex traffic"
avatar: ""
author: "Amazon Cloud Technologies AWS Cloud Computing"
href: ""
date: 2021-02-07
---  

## Background

As a traffic manager, sometimes even when you're prepared for the unexpected, it's hard to stop the unexpected. Building a four-way API gateway is crucial! Here's how **Amazon EKS + Ingress APISIX!** can help with that today.

## Introduction

Kubernetes is an open source system for automating the deployment, scaling and management of containerized applications. **Amazon Elastic Kubernetes Service (Amazon EKS) as a managed Kubernetes service allows you to easily run Kubernetes loads on Amazon Cloud Technologies without the need for control plane or node installation and maintenance.**

**Apache APISIX is a dynamic, real-time, high-performance API gateway. It provides rich traffic management features such as load balancing, dynamic upstream, greyscale deployment, traffic segmentation, authentication and observability.** You can use Apache APISIX to handle north-south traffic between traditional clients and servers as well as east-west traffic between services.

Ingress APISIX can be used as the entry controller for Kubernetes, introducing the best features of Apache APISIX to Kubernetes. This can be driven by well-designed Controller components to help you meet complex traffic management needs.

![apisix-ingress-controller technical architecture](https://static.apiseven.com/202102/WechatIMG3731.jpeg)

## How to configure and run Ingress APISIX on Amazon Elastic Kubernetes Service.

### **Prerequisite Requirements**

Before you are ready to run, please configure an available Amazon EKS cluster on Amazon CloudTech.

You should have the kubectl tool in your own environment, set the context to your own Amazon EKS cluster by running the following command:

    aws eks update-kubeconfig --name <your eks cluster name> --region <your region>

Once the Kubernetes cluster is ready, create a namespace called ingress-apisix, where all the resources that will be used will be created.

    kubectl create namespace ingress-apisix

We will use Helm to deploy all the components of Ingress APISIX (Apache APISIX and apisix-ingress-controller), so please also follow the installation guide (https://helm.sh/docs/intro/install/) to install Helm. The helm chart for Apache APISIX and apisix-ingress-controller is located at apache/apisix-helm-chart (https://github.com/apache/apisix-helm-chart) and apache/apisix-ingress-controller (https://github.com/apache/apisix-ingress-controller), please clone these paths to obtain the corresponding charts.

### **Installing Apache APISIX**

Apache APISIX acts as a proxy plane for the apisix-ingress-controller and should be deployed in advance.

    cd /path/to/apisix-helm-chart
    helm repo add bitnami https://charts.bitnami.com/bitnami
    helm dependency update . /chart/apisix
    helm install apisix . /chart/apisix \
      --set gateway.type=LoadBalancer \
      --set allow.ipList="{0.0.0.0/0}" \
      --namespace ingress-apisix
    kubectl get service --namespace ingress-apisix

The above command will create two Kubernetes Service resources, apisix-gateway, which handles real traffic, and apisix-admin, which acts as the control plane and handles all configuration changes. Here we create apisix-gateway as a LoadBalancer type of service, which can be exposed to the Internet with the help of Amazon Network Load Balancer. We can find the hostname of the load balancer with the following command:

    kubectl get service apisix-gateway \
    --namespace ingress-apisix \
    -o jsonpath='{.status.loadBalancer.ingress[].hostname}'

Also note: the allow.ipList field should be tailored to the EKS CIDR Ranges in our own Amazon EKS cluster, so that apisix-ingress-controller can be licensed by Apache APISIX (for pushing resources).

See value.yaml (https://github.com/apache/apisix-helm-chart/blob/master/chart/apisix/values.yaml) for further information on all configuration items if there are any other requirements.

### **Install apisix-ingress-controller**

After successfully deploying Apache APISIX, it is time to install the Controller component.

    cd /path/to/apisix-ingress-controller
    # install base resources, e.g. ServiceAccount.
    helm install ingress-apisix-base -n ingress-apisix . /charts/base
    # install apisix-ingress-controller
    helm install ingress-apisix . /charts/ingress-apisix \
      --set ingressController.image.tag=dev \
      --set ingressController.config.apisix.baseURL=http://apisix-admin:9180/apisix/admin \
      --set ingressController.config.apisix.adminKey={YOUR ADMIN KEY} \
      --namespace ingress-apisix

The ingress-apisix-base chart will install some basic dependencies for the apisix-ingress-controller, such as ServiceAccount and its dedicated CRD.

The ingress-apisix chart will guide us through the installation of the Controller itself, we can change the image tag to the desired release and we can change the value of ingressController.config.apisix.adminKey in the above command, These configurations can be adjusted according to actual scenarios (and make sure that the Admin key used here is the same as the Key used in the Apache APISIX deployment). If you have other requirements, you can refer to value.yaml to learn more about all configuration items.

Then try opening the **Amazon EKS console**, select your cluster and click on the Workloads tab and you will see that all Pods, etcd and apisix-ingress-controller for Apache APISIX are ready.

### **Start testing**

At this point we have deployed all the components of Ingress APISIX, so make sure you verify that everything is working properly. We will then deploy an httpbin service and ask Apache APISIX to route all requests to the "local.httpbin.org" host to this service.

To do this, we first need to create the httpbin workload and expose it.

    kubectl run httpbin --image kennethreitz/httpbin --port 80
    kubectl expose pod httpbin --port 80

In order to get Apache APISIX to route requests correctly, we need to create an ApisixRoute resource to drive the process.

    # ar-httpbin.yaml
    apiVersion: apisix.apache.org/v1
    kind: ApisixRoute
    metadata:
      name: httpserver-route
    spec:
      rules:
      - host: local.httpbin.org
        http:
          paths:
          - backend:
              serviceName: httpbin
              servicePort: 80
            path: /*

The ApisixRoute resource above will allow Apache APISIX to route requests with a host header of "local.httpbin.org" to the httpbin backend (which we have just created).

This setting is then applied, but please note that the service and the ApisixRoute resource should be placed in the same namespace, and the apisix-ingress-controller is not allowed to cross namespaces.

    kubectl apply -f ar-httpbin.yaml

Test the results with a simple curl call from anywhere that can reach the Apache APISIX service.

    $ curl http://{apisix-gateway-ip}:{apisix-gateway-port}/headers -s -H 'Host: local.httpbin.org'


    {
      "headers": {
        "Accept": "*/*",
        "Host": "httpbin.org",
        "User-Agent": "curl/7.64.1",
        "X-Amzn-Trace-Id": "Root=1-5ffc3273-2928e0844e19c9810d1bbd8a"
      }
    }

If the Serivce type is ClusterIP, you need to log into a Pod in the Amazon EKS cluster and subsequently use the ClusterIP or Service FQDN to access Apache APISIX. if already exposed (either exposed NodePort or LoadBalancer), then the reachable external endpoint can be accessed directly.

Note: This article is reprinted from the aws WeChat public website.
