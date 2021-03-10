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

export const links: Link[] = [
  {
    label: "首页",
    href: "/"
  },
  {
    label: "新闻报道",
    href: "/news"
  },
  {
    label: "开源项目",
    children: [
      {
        label: "Apache APISIX",
        href: "https://github.com/apache/apisix",
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
    label: "商业产品和支持",
    children: [
      {
        label: '预约演示',
        description: 'Get updates, articles and insights from the team.',
        href: '/form-api7-trial',
        icon: <MdWeb />,
      }, {
        label: '商业支持',
        description: 'Get updates, articles and insights from the team.',
        href: '/business-support',
        icon: <MdWeb />,
      }, {
        label: "Apache APISIX vs API7",
        href: "/apisix-vs-api7",
        description: "产品能力、商业支持对比",
        icon: <IoHelpBuoy />
      }
    ]
  },
  {
    label: '资源',
    children: [
      {
        label: '获取帮助',
        description: 'Read our documentation and FAQs, or get in touch.',
        href: '#',
        icon: <IoHelpBuoy />,
      },
      {
        label: 'DevCon',
        description: '观看 Apache APISIX DevCon 2020 大会录像',
        href: '/resources/apisix-devcon-2020',
        icon: <IoCalendar />,
      },
      {
        label: '用户案例',
        description: 'Do even more with Assistants, plugins and integrations.',
        href: '/usercases',
        icon: <IoGrid />,
      },
      {
        label: '博客',
        description: 'Get updates, articles and insights from the team.',
        href: '/blog',
        icon: <MdWeb />,
      },
    ],
  },
  {
    label: "诚聘英才",
    href: "/careers"
  }
]
