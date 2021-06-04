import { Badge } from '@chakra-ui/react'
import * as React from 'react'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'

export interface LinkGroupData {
  title: string
  links: Array<{
    label: string
    href: string
    badge?: React.ReactElement
  }>
}

export const EN_US_links: LinkGroupData[] = [
  {
    title: "Product",
    links: [
      {
        label: "API Gateway",
        href: "http://apisix.apache.org/",
        badge: (
          <Badge colorScheme="blue" variant="solid" fontSize="0.625rem">
            Hot
          </Badge>
        ),
      }, {
        label: "k8s Ingress Controller",
        href: "https://github.com/apache/apisix-ingress-controller",
      }, {
        label: "Service Mesh",
        href: "https://github.com/api7/apisix-mesh-agent"
      }
    ]
  },
  {
    title: "Resources",
    links: [
      {
        label: "Usercases",
        href: "/usercases"
      }, {
        label: "Blog",
        href: "/blog"
      }, {
        label: "DevCon",
        href: "/resources/apisix-devcon-2020"
      }, , {
        label: "Documentation",
        href: "#"
      }
    ]
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "/about"
      }, {
        label: "Team",
        href: "/team"
      }, {
        label: "Careers",
        href: "/careers"
      }, {
        label: "News",
        href: "/news"
      }
    ]
  },
  {
    title: "Contact",
    links: [
      {
        label: "Block 5E, Shenzhen Software Industry Base",
        href: "#"
      }, {
        label: "Building 2, Hangzhou Fortune Financial Center",
        href: "#"
      }, {
        label: "support@api7.ai",
        href: "mailto:support@api7.ai"
      }
    ]
  },
]

export const ZH_CN_links: LinkGroupData[] = [
  {
    title: "产品",
    links: [
      {
        label: "API 网关",
        href: "http://apisix.apache.org/",
        badge: (
          <Badge colorScheme="blue" variant="solid" fontSize="0.625rem">
            Hot
          </Badge>
        ),
      }, {
        label: "k8s Ingress Controller",
        href: "https://github.com/apache/apisix-ingress-controller",
      }, {
        label: "服务网格",
        href: "#"
      }
    ]
  },
  {
    title: "相关资源",
    links: [
      {
        label: "用户案例",
        href: "/usercases"
      }, {
        label: "技术博客",
        href: "/blog"
      }, {
        label: "开发者大会",
        href: "/resources/apisix-devcon-2020"
      }, , {
        label: "产品文档",
        href: "#"
      }
    ]
  },
  {
    title: "支流科技",
    links: [
      {
        label: "关于我们",
        href: "/about"
      }, {
        label: "团队成员",
        href: "/team"
      }, {
        label: "工作机会",
        href: "/careers"
      }, {
        label: "新闻报道",
        href: "/news"
      }
    ]
  },
  {
    title: "联系我们",
    links: [
      {
        label: "深圳软件产业基地 5E 座",
        href: "#"
      }, {
        label: "杭州财富金融中心 2 幢",
        href: "#"
      }, {
        label: "support@api7.ai",
        href: "mailto:support@api7.ai"
      }
    ]
  },
]

interface SocialLink {
  label: string
  icon: React.ReactElement
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'Twitter', icon: <FaTwitter />, href: 'https://twitter.com/ApacheAPISIX' },
  { label: 'YouTube', icon: <FaYoutube />, href: 'https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g' },
  { label: 'Github', icon: <FaGithub />, href: 'https://github.com/apache/apisix' }
]

interface FooterLink {
  label: string
  href: string
}

export const footerLinks: FooterLink[] = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Offer terms', href: '#' },
  { label: 'Legal notice', href: '#' },
  { label: 'Sitemap', href: '#' },
]
