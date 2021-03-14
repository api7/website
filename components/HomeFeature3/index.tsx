import {
  Box,
  Center,
  Grid,
  Heading,
  Stack,
  StackProps,
  Text,
  Image,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { SampleLogo } from './SampleLogo'
import { Testimonial } from './Testimonial'

const App = () => {
  return (
    <Box as="section" py="24" bg={mode('gray.100', 'gray.800')}>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Grid templateColumns={{ base: '1fr', md: '792px 1fr' }} gap="64px">
          <Box>
            <Center
              bg={mode('white', 'gray.700')}
              shadow="lg"
              minH={{ base: '320px', lg: '480px' }}
              rounded="lg"
            >
              <Box>
                <Image src="https://static.apiseven.com/2020/05/1594881772-Canvas-1.png" />
              </Box>
            </Center>
          </Box>
          <Box>
            <Heading size="2xl" letterSpacing="tight" fontWeight="extrabold">
              下一代云原生 API 管理平台
            </Heading>

            <Testimonial
              logo={<SampleLogo />}
              author="Susan Mana"
              company="Executive director"
              image="https://images.unsplash.com/photo-1531078215167-91fcfe45b39e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2598&q=80"
            >
              支持混合云、多数据中心、Kubernetes 等部署方式，帮助您快速、安全地处理业务数据，并进行动态扩展
            </Testimonial>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}

export default App