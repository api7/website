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

export const links: LinkGroupData[] = [
  {
    title: "产品",
    links: [
      {
        label: "API 网关",
        href: "https://github.com/apache/apisix",
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
    title: "资源",
    links: [
      {
        label: "用户案例",
        href: "/usercases"
      }, {
        label: "技术博客",
        href: "/blog"
      }, {
        label: "视频",
        href: "https://space.bilibili.com/551921247"
      }, {
        label: "开发者大会",
        href: "#"
      }
    ]
  },
  {
    title: "公司",
    links: [
      {
        label: "关于我们",
        href: "/about"
      }, {
        label: "诚聘英才",
        href: "/careers"
      }, {
        label: "新闻报道",
        href: "/news"
      }, {
        label: "申请成为合作伙伴",
        href: "wenming@api7.ai"
      }
    ]
  },
  {
    title: "联系我们",
    links: [
      {
        label: "深圳支流科技有限公司",
        href: "#"
      }, {
        label: "深圳软件产业基地 5E 座",
        href: "#"
      }, {
        label: "杭州财富金融中心 2 幢 46 楼",
        href: "#"
      }, {
        label: "wenming@api7.ai",
        href: "wenming@api7.ai"
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
