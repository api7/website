import * as React from 'react'
import { IoCalendar, IoGrid, IoHelpBuoy } from 'react-icons/io5'
import { MdWeb } from 'react-icons/md'

export interface Link {
  label: string
  href?: string
  children?: Array<{
    label: string
    description?: string
    href: string
    icon?: React.ReactElement
  }>
}

export const EN_US_Links: Link[] = [
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: "Open Source",
    children: [
      {
        label: "Apache APISIX",
        href: "http://apisix.apache.org/",
        description: "A dynamic, real-time, high-performance API gateway.",
        icon: <IoHelpBuoy />
      }, {
        label: "Apache APISIX Ingress Controller",
        href: "https://github.com/apache/apisix-ingress-controller",
        description: "Integrated with Kubernetes cluster management capabilities, it supports assertive dynamic configuration of distribution rules for ingress traffic.",
        icon: <IoHelpBuoy />
      }, {
        label: "Service Mesh",
        href: "#",
        description: "Coming soon",
        icon: <IoHelpBuoy />
      }
    ]
  },

  {
    label: 'Resources',
    children: [
      {
        label: 'Usercases',
        description: 'Stories of the world\'s leading companies and API7 products',
        href: '/usercases',
        icon: <IoGrid />,
      },
      {
        label: 'DevCon',
        description: 'Watch Apache APISIX DevCon 2020 Records',
        href: '/resources/apisix-devcon-2020',
        icon: <IoCalendar />,
      },
      {
        label: 'Documentation',
        description: 'Coming soon',
        href: '#',
        icon: <IoHelpBuoy />,
      },
    ],
  },
  {
    label: 'Company',
    children: [
      {
        label: 'About',
        description: 'About Shenzhen Zhiliu Technolody',
        href: '/about',
        icon: <MdWeb />,
      },
      {
        label: "News",
        description: "Get latest news about Zhiliu Technology",
        href: "/news",
        icon: <MdWeb />
      },
      {
        label: 'Team',
        description: 'No one can whistle a symphony. It takes a whole orchestra to play it',
        href: '/team',
        icon: <MdWeb />,
      },
      {
        label: 'Careers',
        description: 'Work with us to build the system of the cloud.',
        href: '/careers',
        icon: <MdWeb />,
      },
    ],
  }, {
    label: "Support",
    children: [
      {
        label: 'Request Demo',
        description: 'Contact us and request demo',
        href: '/form-api7-trial',
        icon: <MdWeb />,
      }, {
        label: 'Business Support',
        description: 'Features included in commercial products',
        href: '/business-support',
        icon: <MdWeb />,
      }, {
        label: "Apache APISIX vs API7",
        href: "/apisix-vs-api7",
        description: "Difference between Apache APISIX and API7",
        icon: <IoHelpBuoy />
      }
    ]
  },
]

export const ZH_CN_Links: Link[] = [
  {
    label: '技术博客',
    href: '/blog',
  },
  {
    label: "开源项目",
    children: [
      {
        label: "Apache APISIX",
        href: "http://apisix.apache.org/",
        description: "高性能、可扩展的微服务 API 网关",
        icon: <IoHelpBuoy />
      }, {
        label: "Apache APISIX Ingress Controller",
        href: "https://github.com/apache/apisix-ingress-controller",
        description: "基于 Apache APISIX 并集成 Kubernetes 集群管理能力，支持申明式动态配置入口流量的分发规则。",
        icon: <IoHelpBuoy />
      }, {
        label: "Service Mesh",
        href: "#",
        description: "敬请期待",
        icon: <IoHelpBuoy />
      }
    ]
  },

  {
    label: '相关资源',
    children: [
      {
        label: '用户案例',
        description: '阅读全球领先企业与深圳支流科技的故事',
        href: '/usercases',
        icon: <IoGrid />,
      },
      {
        label: '开发者大会',
        description: '观看 Apache APISIX DevCon 2020 大会录像',
        href: '/resources/apisix-devcon-2020',
        icon: <IoCalendar />,
      },
      {
        label: '产品文档',
        description: '敬请期待',
        href: '#',
        icon: <IoHelpBuoy />,
      },
    ],
  }, {
    label: "商业支持",
    children: [
      {
        label: '商业支持',
        description: '获取 API7 产品商业支持内容',
        href: '/business-support',
        icon: <IoGrid />,
      }, {
        label: '预约演示',
        description: '联系我们，预约产品演示。',
        href: '/form-api7-trial',
        icon: <IoCalendar />,
      }, {
        label: "Apache APISIX vs API7",
        href: "/apisix-vs-api7",
        description: "产品能力、商业支持对比",
        icon: <IoHelpBuoy />
      }
    ]
  },
  {
    label: '支流科技',
    children: [
      {
        label: '关于我们',
        description: '关于深圳支流科技',
        href: '/about',
        icon: <MdWeb />,
      },
      {
        label: "新闻报道",
        description: "获取支流科技相关新闻",
        href: "/news",
        icon: <MdWeb />
      },
      {
        label: '团队成员',
        description: '团队成员热爱开源、技术背景深厚',
        href: '/team',
        icon: <MdWeb />,
      },
      {
        label: '工作机会',
        description: '与我们一起构建云原生产品',
        href: '/careers',
        icon: <MdWeb />,
      },
    ],
  }
]
