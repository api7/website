import { Box, Heading, SimpleGrid, Text, Image } from '@chakra-ui/react'
import * as React from 'react'
import * as Logos from './Brands'

const logos = [
  {
    src: "https://static.apiseven.com/2020/05/WechatIMG618.png"
  }, {
    src: "https://static.apiseven.com/2020/05/NASA.png"
  }, {
    src: "https://static.apiseven.com/2020/05/%E4%B8%AD%E5%9B%BD%E8%88%AA%E4%BF%A1.png"
  }, {
    src: "https://static.apiseven.com/2020/05/HelloTalk.png"
  }, {
    src: "https://static.apiseven.com/2020/05/1588907633-WechatIMG630.png"
  }, {
    src: "https://static.apiseven.com/2020/05/%E8%85%BE%E8%AE%AF%E4%BA%91-768x273.jpg"
  }, {
    src: "https://static.apiseven.com/2020/05/1588840167-airwallexreview.png"
  }, {
    src: "https://static.apiseven.com/2020/05/1588907762-WechatIMG2916.png"
  }, {
    src: "https://static.apiseven.com/2020/05/1588907453-ezgif-3-6c2dbe3cc8cd.png"
  }, {
    src: "https://static.apiseven.com/2020/05/1588907670-WechatIMG631.png"
  }
]

export default () => {
  return (
    <Box bg="blue.600" color="white" as="section" pt="16" pb="24">
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box textAlign="center">
          <Heading size="lg" mb="4">
            为全球领先企业所信任
          </Heading>
          <Text maxW="2xl" mx="auto">
            覆盖互联网、教育、媒体、金融、新零售、电商等 20 多个行业
          </Text>
        </Box>
        <SimpleGrid
          columns={{ base: 2, lg: 5 }}
          spacing={{ base: '6', md: '12', lg: '16' }}
          mt="12"
          alignItems="center"
          justifyItems="center"
          fontSize="2xl"
          opacity={0.6}
        >
          {/* {
            logos.map(({ src }) => (
              <Box>
                <Image src={src} />
              </Box>
            ))
          } */}
          <Logos.ChatMonkey />
          <Logos.Wakanda />
          <Logos.Lighthouse />
          <Logos.Plumtic />
          <Logos.WorkScout />

        </SimpleGrid>
      </Box>
    </Box>
  )
}
