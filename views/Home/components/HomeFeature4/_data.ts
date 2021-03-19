import { BlogData } from './BlogCard'

export const EN_US_data: BlogData[] = [
  {
    image:
      'https://static.apiseven.com/202102/WechatIMG3731.jpeg',
    title: 'How Amazon EKS and APISIX ingress controller work together to manage complex traffic',
    description:
      'Amazon Elastic Kubernetes Service (Amazon EKS), a hosted Kubernetes service, allows you to easily run Kubernetes loads on Amazon Cloud Technologies without the need for control plane or node installation and maintenance.',
    type: 'article',
    tags: ['k8s', 'Amazon'],
    href: '/zh/blog/how-Amazon-EKS-and-APISIX-ingress-controller-work-together-to-manage-complex-traffic'
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
  {
    image:
      'https://static.apiseven.com/logo/geely-1.png',
    title: 'Digitalization of Industry, "Smart" Future',
    description:
      'Cloud native has become a key driver of digital transformation for global enterprises. Zhiliu Technology and Geely are working together to achieve centralized management, visualization and security of APIs, laying the foundation for Geely\'s next "10 million vehicle" era.',
    type: 'article',
    tags: [],
    href: '/zh/usercase/geely'
  },
]

export const ZH_CN_data: BlogData[] = [
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
  {
    image:
      'https://static.apiseven.com/logo/geely-1.png',
    title: '支流科技与吉利汽车：产业数字化，「智造」未来',
    description:
      '云原生已经成为全球企业数字化转型关键的驱动力，支流科技与吉利合作，实现对 API 的集中管理、可视化和安全保障，为吉利下一个「千万辆」时代打好基础。',
    type: '博客',
    tags: ['吉利集团'],
    href: '/zh/usercase/geely'
  },
]
