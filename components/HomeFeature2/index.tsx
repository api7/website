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

export default () => {
  return (
    <Box as="section" py="24" bg={mode('gray.100', 'gray.800')}>
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Grid templateColumns={{ base: '1fr', md: '360px 1fr' }} gap="64px">
          <Box>
            <Heading size="2xl" letterSpacing="tight" fontWeight="extrabold">
              低代码 API 网关
            </Heading>

            <Testimonial
              logo={<SampleLogo />}
              author="Susan Mana"
              company="Executive director"
              image="https://images.unsplash.com/photo-1531078215167-91fcfe45b39e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2598&q=80"
            >
              &ldquo; 企业需求千差万别，不用二次开发的 API 网关才是根本的解决之道。<br />从开发工程师，到运维、测试、安全工程师，甚至产品经理，都可以让 Apache APISIX 的 40 多个插件协同合作，创造属于自己的接入层 &rdquo;
            </Testimonial>
          </Box>
          <Box>
            <Center
              bg={mode('white', 'gray.700')}
              shadow="lg"
              minH={{ base: '320px', lg: '480px' }}
              rounded="lg"
            >
              <Box>
                <Image src="https://static.apiseven.com/low-code-api-gateway-example-zh-CN.gif" />
              </Box>
            </Center>
          </Box>
        </Grid>
      </Box>
    </Box>
  )
}
