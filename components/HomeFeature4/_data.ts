import { BlogData } from './BlogCard'

export const data: BlogData[] = [
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
