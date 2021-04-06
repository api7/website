import { BlogData } from './BlogCard'

export const EN_US_data: BlogData[] = [
  {
    image:
      'https://api7-website-1301662268.file.myqcloud.com/ingress_controller_cover.png',
    title: 'Traffic Split in Apache APISIX Ingress Controller',
    description:
      'Traffic Split is a feature that splits and deliveries traffic to multiple backend services. Solutions like API Gateway (e.g. Apache APISIX and Traefik), Service Mesh (e.g. Istio and Linkerd) are capable of doing traffic splitting and implement functionalities like Canary Release and Blue-Green Deployment.',
    type: 'article',
    tags: ['Ingress Controller'],
    href: '/en/blog/traffic-split-in-apache-apisix-ingress-controller'
  },
  {
    image:
      'https://static.apiseven.com/202102/WechatIMG3731.jpeg',
    title: 'How Amazon EKS and APISIX ingress controller work together to manage complex traffic',
    description:
      'Amazon Elastic Kubernetes Service (Amazon EKS), a hosted Kubernetes service, allows you to easily run Kubernetes loads on Amazon Cloud Technologies without the need for control plane or node installation and maintenance.',
    type: 'article',
    tags: ['k8s', 'Amazon'],
    href: '/en/blog/how-Amazon-EKS-and-APISIX-ingress-controller-work-together-to-manage-complex-traffic'
  }, {
    image:
      'https://static.apiseven.com/Snip20210315_.png',
    title: 'APISIX and Microservice Gateway Patterns in Practice at Airwallex',
    description:
      'What performance has Airwallex improved with the introduction of the high-performance open source gateway Apache APISIX, what is its gateway selection and gateway architecture? And what is the structure of its distributed route management?',
    type: 'video',
    tags: ['Airwallex', 'Microservices'],
    href: '/zh/apisix-devcon-2020/airwallex'
  },
]

export const ZH_CN_data: BlogData[] = [
  {
    image:
      'https://api7-website-1301662268.file.myqcloud.com/ingress_controller_cover.png',
    title: 'Apache APISIX Ingress Controller 中的流量切分',
    description:
      '流量切分（traffic split）是指将流量按照定义好的规则和比例分摊到多个后端服务，像常见的 API 网关产品（例如 Apache APISIX，Traefik）、服务网格 Sidecar Proxy（例如 Envoy，linkerd2-proxy），都提供了流量切分的功能，以此来实现细粒度的金丝雀发布，蓝绿部署等功能。',
    type: '博客',
    tags: ['Ingress Controller'],
    href: '/zh/blog/traffic-split-in-apache-apisix-ingress-controller'
  },
  {
    image:
      'https://static.apiseven.com/202102/WechatIMG3731.jpeg',
    title: 'Amazon EKS 和 APISIX ingress controller 如何配合使用来管理复杂流量',
    description:
      'Amazon Elastic Kubernetes Service（Amazon EKS）作为一种托管的 Kubernetes 服务，您可以在亚马逊云科技上轻松运行 Kubernetes 负载而无需对控制平面或节点进行安装和维护。',
    type: '博客',
    tags: ['k8s', 'Amazon'],
    href: '/zh/blog/how-Amazon-EKS-and-APISIX-ingress-controller-work-together-to-manage-complex-traffic'
  }, {
    image:
      'https://static.apiseven.com/Snip20210315_.png',
    title: 'APISIX 与微服务网关模式在 Airwallex 的实践',
    description:
      '空中云汇（Airwallex）引入高性能开源网关 Apache APISIX 后提高了哪些性能，它的网关选型和网关架构是什么？以及它的分布式路由管理的结构是怎样的？',
    type: 'video',
    tags: ['Airwallex', '微服务'],
    href: '/zh/apisix-devcon-2020/airwallex'
  },
]
