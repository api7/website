import {
  Box,
  Image,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { SubscribeForm } from './SubscribeForm'

const App = () => {
  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} pt="24" pb="12" overflow="hidden">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack
          align="flex-start"
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '20', lg: '8' }}
          justify="center"
          mb="20"
        >
          <Box flex="1" maxW={{ lg: 'xl' }} pt="10">
            <Heading as="h1" size="3xl" mt="8" fontWeight="extrabold">
              驱动企业数字化转型
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mt="25" fontSize="xl">
              管理并可视化 API 和微服务等企业关键业务流量，通过大数据和人工智能（AI）加速企业业务决策
            </Text>
            <SubscribeForm />
          </Box>
        </Stack>
      </Box>
      <Box as="section" pt={{ base: '30' }}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <SimpleGrid
            mt="4"
            columns={{ base: 1, md: 2, lg: 6 }}
            color="gray.500"
            alignItems="center"
            justifyItems="center"
            spacing={{ base: '12', lg: '12' }}
            fontSize="2xl"
          >
            <Image src="https://static.apiseven.com/brand/tencent.svg" />
            <Image src="https://static.apiseven.com/brand/Airwallex%20Logo%20-%20White.svg" />
            <Image src="https://static.apiseven.com/brand/logo%20horizontal%20w.%20background.png" />
            <Image src="https://static.apiseven.com/brand/Untitled2.svg" />
            <Image src="https://p3.ssl.qhimg.com/t011e94f0b9ed8e66b0.png" />
            <Image src="https://static.apiseven.com/2020/05/1588907670-WechatIMG631.png" />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}

export default App