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
