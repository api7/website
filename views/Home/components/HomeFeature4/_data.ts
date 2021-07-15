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
      'https://api7-website-1301662268.file.myqcloud.com/logo/640.webp',
    title: '支流科技进入中国信通院发布的首批开源供应商名录',
    description: '随着开源技术的热度不断攀升，开源软件应用已成为普遍现象。开源用户对开源软件的商业支持、云服务和服务的需求日益紧迫，因此梳理开源供应商名录势在必行。',
    type: 'article',
    tags: [],
    href: 'https://mp.weixin.qq.com/s/DDCKSVshAbNQmCgY8Z4M4Q'
  },
  {
    image:
      'https://api7-website-1301662268.file.myqcloud.com/ingress_controller_cover.png',
    title: 'Apache APISIX Ingress Controller 中的流量切分',
    description:
      '流量切分是指将流量按照定义好的规则和比例分摊到多个后端服务，像常见的 API 网关产品、服务网格 Sidecar Proxy，都提供了流量切分的功能，以此来实现细粒度的金丝雀发布，蓝绿部署等功能。',
    type: '博客',
    tags: ['Ingress Controller'],
    href: '/zh/blog/traffic-split-in-apache-apisix-ingress-controller'
  },
  {
    image:
      'https://img.t.sinajs.cn/t6/style/images/global_nav/WB_logo-x2.png?id=1404211047727',
    title: '基于 Apache APISIX，新浪微博 API 网关的定制化开发之路',
    description:
      'Apache APISIX 动态、高效、稳定等特性能够满足业务上快速响应要求，新浪微博技术团队基于 Apache APISIX 进行了定制化的开发。',
    type: '博客',
    tags: ['网关', '定制化','云原生'],
    href: '/zh/blog/the-road-to-customization-of-Sina-Weibo-API-gateway-based-on-Apache-APISIX'
  }
]
