export interface Member {
  role: string
  image: string
  name: string
  twitter?: string
  linkedin?: string
  github?: string
  type: 'team' | 'adviser'
  description: string
}

export const members: Member[] = [
  {
    role: 'Co-Founder / CEO',
    image:
      'https://avatars.githubusercontent.com/u/26448043?s=400&u=9a51a2ee99658ea30918952675fdffeca8b5dc4c&v=4',
    name: 'Ming Wen',
    twitter: 'https://twitter.com/_WenMing',
    github: 'https://github.com/moonming',
    description: 'Apache Member / PMC Chair of Apache APISIX',
    type: 'team'
  },
  {
    role: 'Co-Founder / CTO',
    image:
      'https://avatars.githubusercontent.com/u/6814606?s=460&u=159f149cf81a9e8a7d5df456456a17f7f6905b62&v=4',
    name: 'Yuansheng Wang',
    github: 'https://github.com/membphis',
    description: 'Apache APISIX Founder & PMC',
    type: 'team'
  }, {
    role: 'Technical Consultant',
    image:
      'https://www.tetrate.io/about/img/people/sheng-wu.jpg',
    name: 'Sheng Wu',
    github: 'https://github.com/wu-sheng',
    twitter: 'https://twitter.com/wusheng1108',
    description: 'Apache Board / Apache SkyWalking Founder',
    type: 'adviser'
  }
]
