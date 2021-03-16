import {
  Box,
  Button,
  Center,
  Heading,
  Img,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaArrowRight } from 'react-icons/fa'

export const App = () => {
  return (
    <Box as="section" bg={mode('gray.100', 'gray.800')} py="20">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack spacing={{ base: '4', lg: '20' }} direction={{ base: 'column', lg: 'row' }}>
          <Center flex="1" shadow="lg" minH="26rem" maxW={{ lg: 'xl' }}>
            <Img
              objectFit="contain"
              w="full"
              h="full"
              htmlWidth="576px"
              htmlHeight="420px"
              src="https://static.apiseven.com/2020/05/1594881772-Canvas-1.png"
              alt="下一代云原生 API 管理平台"
            />
          </Center>
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="2xl"
              mt="10"
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="normal"
            >
              下一代云原生 API 管理平台
            </Heading>
            <Text fontSize="lg" mt="6" color={mode('gray.600', 'gray.400')}>
              支持混合云、多数据中心、Kubernetes 等部署方式，帮助您快速、安全地处理业务数据，并进行动态扩展
            </Text>
            <Button
              className="group"
              mt="8"
              colorScheme="blue"
              size="lg"
              px="8"
              fontWeight="bold"
              h="14"
              iconSpacing="3"
              rightIcon={
                <Box
                  as={FaArrowRight}
                  fontSize="sm"
                  transition="transform 0.2s"
                  _groupHover={{ transform: 'translateX(2px)' }}
                />
              }
            >
              了解更多
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
