---
title: "A first look at Kubernetes Service APIs"
avatar: "https://avatars.githubusercontent.com/u/4413028?s=460&u=e140a6d2bf19c426da6498b8888edc96509be649&v=4"
author: "Jin Wei"
href: "https://github.com/gxthrj"
date: 2020-12-18
---  

## Preface

We know that Kubernetes has a number of solutions for exposing services inside the cluster, one of the more popular being Ingress, which is a standard for exposing services to the outside world and has a number of third party implementations, each with their own technology stack and dependencies on gateways that are not compatible with each other.

In order to unify the various Ingress implementations and facilitate uniform management on Kubernetes, the [SIG-NETWORK](https://github.com/kubernetes/community/tree/master/sig-network) community has released [Kubernetes Service APIs](https://kubernetes-sigs.github.io/service-apis/), a set of standard implementations called second-generation Ingress.

## Subject Description

This article provides an introduction to the basic concepts of Kubernetes Service APIs, starting with a few questions.

## Introduction

### The Kubernetes Service APIs are called the second generation of Ingress technology, but in what ways are they better than the first generation?

The Kubernetes Service APIs were not designed to be limited to Ingress, but rather to enhance service networking with a focus on the following: expressiveness, scalability, and RBAC.

1. More features, e.g. managing traffic based on the header, weight.

```yaml
kind: HTTPRoute
apiVersion: networking.x-k8s.io/v1alpha1
...
matches:
  - path:
      value: "/foo"
    headers:
      values:
        version: "2"
  - path:
      value: "/v2/foo"
```

2. Enhancing scalability, the Service APIs introduce the concept of a multi-layer API, with each layer exposing its own interface, allowing other custom resources to interface with the API for finer-grained (API-grained) control.

![api-model](https://gateway-api.sigs.k8s.io/images/api-model.png)

3. Role-oriented RBAC: The realization of multi-layer API, one of the ideas is to design resource objects from the perspective of users. These resources will eventually be mapped with the common roles of running applications on Kubernetes. 

## What resource objects are abstracted by the Kubernetes Service APIs?

Based on user roles, Kubernetes Service APIs will define the following resources:

GatewayClass, Gateway, Route

1. GatewayClass defines a set of gateway types with common configuration and behaviour:

- Relationship to Gateway, similar to `ingess.class` annotation in ingress;

- A GatewayClass defines a group of gateways that share the same configuration and behaviour. Each GatewayClass will be handled by a single controller, with the controller having a one-to-many relationship with the GatewayClass;

- GatewayClass is a cluster resource. At least one GatewayClass must be defined in order to have a functional gateway.

2. Gateway requests a point at which traffic can be converted to services within the cluster:

- What it does: brings traffic from outside the cluster to inside the cluster. This is the real ingress entity;

- It defines a request for a specific LB configuration which is also the implementation of the configuration and behaviour of the GatewayClass;

- Gateway resources can be created directly by the operator or by the controller handling the GatewayClass;

- Gateway and Route are in a many-to-many relationship.

3. Route describes how traffic passing through a gateway is mapped to a service.  

![schema-uml](https://gateway-api.sigs.k8s.io/images/schema-uml.svg)

In addition, the Kubernetes Service APIs define a BackendPolicy resource object in order to enable flexible configuration of backend services.

The BackendPolicy object allows you to configure TLS, health checks and specify the type of backend service, such as service or pod.

## What changes will the introduction of Kubernetes Service APIs bring?

Kubernetes Service APIs, as an implementation standard, brings the following changes.

1. generality: there can be multiple implementations, just as there are multiple implementations of ingress. ingress controllers can be customised according to the characteristics of the gateway, but they all have a consistent configuration structure. One data structure can be used to configure multiple ingress controllers.

2. The concept of classes: GatewayClasses allows for the configuration of different types of load balancing implementations. These class classes allow the user to easily and explicitly understand which functions can be used as resource models themselves.

3. Shared gateways: By allowing independent routing resources HTTPRoute to be bound to the same GatewayClass, they can share load balancers and VIPs. layered by user, this allows teams to safely share the infrastructure without having to care about the specific implementation of the lower level Gateway.

4. backend references with types: With backend references with types, routes can reference Kubernetes Services, or any type of Kubernetes resource designed as a gateway backend, such as a pod, or a statefulset such as a DB, or even an accessible cluster external resource.

5. Cross-namespace references: Routes across different namespaces can be bound to a Gateway, allowing access to each other across namespaces. It is also possible to restrict the range of namespaces that a Route under a Gateway can access.

## What ingress implementations of Kubernetes Service APIs are currently available?

The Ingress that are known to support the Kubernetes Service APIs resource objects at the code level are Contour, ingress-gce.

## How do the Kubernetes Service APIs manage resource read and write permissions?

The Kubernetes Service APIs are divided into 3 roles based on the user dimension:

1. infrastructure provider GatewayClass;

2. cluster operator Gateway;

3. application developer Route.

RBAC (Role Based Access Control) is the standard used for Kubernetes authorisation. It allows users to configure who can perform operations on a specific range of resources. RBAC can be used to enable each of the roles defined above.

In most cases, it is expected that all roles will be able to read all resources.

The three-tier model has the following write permissions.

| | GatewayClass | Gateway | Route |
| --- | --- | --- | --- |
| Infrastructure Provider | Yes | Yes | Yes |
| Cluster Operators | No | Yes | Yes |
| Application Developers | No | No | Yes |

## What are the extension points for Kubernetes Service APIs?

The requirements for gateways are very rich, and there are many ways to implement the same scenario, each with its own advantages and disadvantages. Kubernetes Service APIs have extracted multi-layer resource objects, and also reserved some extension points.

The Kubernetes Service APIs currently focus on Route:

- RouteMatch extends Route matching rules.

- specify Backend extends specific types of backend services, such as file systems, function expressions, etc., in addition to the Kubernetes resources mentioned above.

- Route filter adds extensions to the Route lifecycle to handle requests/response.

- If none of the above extensions can be satisfied by a Custom Route, a Route can be fully customized.

# Summary

This article has provided a basic introduction to the Kubernetes Service APIs by asking questions. As a whole, the Kubernetes Service APIs refine many of the best practices of ingress, such as the enhanced expressiveness, which actually extends the capabilities of Route, and the BackendPolicy objects, which can specify almost any Kubernetes backend resource for upstream. The Kubernetes Service APIs currently specify the resource objects at a broad level, but there are still many details within the resource objects that need to be discussed before they can be defined to prevent possible conflict scenarios, and there are certain variables in the structure.
