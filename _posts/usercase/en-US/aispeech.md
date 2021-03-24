---
title: "aispeech: Why have we rewritten a k8s ingress controller?"
avatar: "https://avatars.githubusercontent.com/u/4413028?s=460&u=e140a6d2bf19c426da6498b8888edc96509be649&v=4"
author: "Jin Wei"
href: "https://github.com/gxthrj"
date: 2020-05-07 
---  

**Preface**

Hello, I'm Jin Wei from Suzhou aispeech. Today I will talk to you about the integration of [Apache APISIX](https://github.com/apache/apisix) and k8s instead of native ingress.

At the time of writing this article, we have applied Apache APISIX in the production environment to take over the ingress traffic of some businesses, and at the same time, we are gradually migrating the traffic from the native ingress, as shown in the following figure:

![2.png](https://static.apiseven.com/2020/05/9c662387-7964-4ade-a469-0b7daa06d7f5-image.png)

With the help of Apache APISIX dynamic routing capabilities for traffic distribution, and at the same time customize some plug-ins to meet business needs.

APISIX-ingress-controller registers the pod ip to the upstream, node, so that business traffic can access the pod directly, bypassing the kube DNS, and it is on this basis that some special load balancing policies can be implemented via the plugin.

From the diagram, it looks like we're doing something that duplicates the native ingress. In this article, we will briefly explain why we abandoned the native ingress and built our own ingress controller with Apache APISIX.

## What is ingress?

Briefly, Ingress is a way for Kubernetes to handle edge-entry traffic.

## ingress What problem to solve

Since the services within a Kubernetes cluster are virtual networks, external traffic accessing the inside of the cluster requires at least a public IP and port mapping.

Kubernetes has a variety of ways to expose edge interfaces, such as, nodeport, loadBalancer, ingress, etc. In comparison, ingress is definitely a more economical way to use reverse proxies by exposing a limited number of public IPs.

Speaking of reverse proxies, we could also just build an Nginx to do the reverse proxy, but having to synchronize the always-variable service state in Kubernetes in Nginx makes it significantly more difficult to maintain.

The good thing is that Kubernetes officially provides and maintains a nginx ingress controller to help us with the reverse proxy thing. With this nginx ingress controller, we can proxy all edge traffic that wants to access Kubernetes and point the traffic to the backend services correctly.

## Problems with the Kubernetes native ingress controller

The Nginx ingress controller helps us maintain state synchronization between the Kubernetes cluster and Nginx, and provides basic reverse proxy capabilities, so why would we want to build our own wheels? The needs of the business cannot be ignored, and we expect more from the ingress controller.

After using the Kubernetes native ingress controller, we found the following outstanding issues:

1. reload problem

    Kubernetes native ingress is designed to pass YAML configuration files to the ingress controller, convert them to nginx.conf, and then trigger a reload of nginx.conf to make the configuration take effect.
    
    Daily operations cannot help but occasionally move the ingress YAML configuration, and every time the configuration takes effect, it triggers a reload, which is unacceptable, especially if the edge traffic uses private connections, which can easily lead to accidents.
  
    Apache APISIX supports hot configuration, so routes can be defined and modified at any time without triggering an nginx reload.
  
2. Writing scripts and filling parameters in annotation

    The native ingress controller supports script fragments defined by annotation in yaml, which feels like a temporary solution to support advanced features and is, frankly, really unmanageable. The large number of annotation scripts causes problems for the configuration staff.
  
    In Apache APISIX, we can write logic via plug-in code to expose a simple configuration interface that facilitates the maintenance of the configuration and avoids scripting interference with the configuration staff.

3. Lack of support for stateful load balancing

    Advanced load balancing policies are not supported, such as session persistent, etc. kubernetes is an operations-oriented, non-business management system, and I think this may be related to the fact that kubernetes promotes a stateless deployment approach, so kubernetes will not officially support these contradictory load balancing policies in the near future. I think this may be related to the fact that kubernetes promotes stateless deployment, so kubernetes will not officially support these contradictory load balancing policies in the near future.

    In fact, google has already tried to solve such problems with its service mesh solution (istio). istio architecture is perfect, but at the expense of performance, which will probably be solved with its mixer v2.

    Since kubernetes supports scaling, we can also extend Apache APISIX to meet our advanced load balancing requirements, since Apache APISIX not only natively supports load balancing such as session persistent, but also reserves the ability to scale the balancer phase.

4. Dynamic adjustment of weights

    Business services often need to control traffic by percentage, which turns into a problem in Kubernetes.
    
    Although Kubernetes supports ipvs after 1.8, neither the kube-proxy startup parameters nor the kube-route annotation are as easy to use as Apache APISIX, which internally abstracts the main objects such as route, service, consumer, upstream, plugin, etc. route, service, consumer, upstream, plugin, and other major objects are abstracted internally by Apache APISIX, and operations like adjusting weights are naturally supported.

5. Weak expansion capabilities

    Although ingress was originally designed to address edge traffic, the demand for edge traffic is no less than for internal traffic.
    
    The need for business-level grayscale control, meltdown, flow control, forensics, traffic control, etc. is much more vocal when implemented on ingress.
    
    However, the extensions provided by the native ingress are now stretched. Apache APISIX provides plug-in support in terms of extension capabilities. In addition to the official plug-ins, you can customize the plug-ins that meet your own characteristics.

    There are also some configuration problems resulting from similar configmap and namespaces, which are related to the way we use them and are not generic, so I won't go into them here.

## Apache APISIX ingress controller

Due to the powerful routing and scaling capabilities of Apache APISIX, using Apache APISIX as an implementation of ingress can easily solve the above mentioned pain points and provide the community with an additional ingress controller option.

The timing diagram is as follows:

![1.png](https://static.apiseven.com/2020/05/ef94496d-c0e5-41ff-a56f-a497cdf03218-image.png)

To implement the Apache APISIX ingress controller, two fundamental problems need to be solved: one is to solve the synchronization of the kubernetes cluster with the Apache APISIX state; the second is to define the objects in Apache APISIX in kubernetes (CRD).

In order to quickly integrate Apache APISIX and take advantage of Apache APISIX, we have created the [Apache APISIX ingress controller](https://github.com/apache/apisix-ingress-controller) project (everyone is welcome to participate), The project currently implements the first type of basic problem: synchronizing Kubernetes pod information to the upstream in Apache APISIX, and implementing a primary backup to solve its own high availability problem.

Since Kubernetes uses YAML to define cluster state declaratively, we need to define CRD (Custom Resource Definitions) for the objects (route/service/upstream/plugin) in Apache APISIX to be integrated into kubernetes.

To facilitate the migration of existing Kubernetes ingress users, we will try to be compatible with the existing ingress configuration items.

These features will be our next efforts, and we welcome everyone to join us.
