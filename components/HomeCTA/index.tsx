import { Box, Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

const App = () => {
  return (
    <Box as="section">
      <Box
        maxW="3xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '16', sm: '20' }}
        textAlign="center"
      >
        <Text fontWeight="semibold" color={useColorModeValue('blue.600', 'blue.200')}>
          我们支持灵活的计费方式
        </Text>
        <Heading
          my="4"
          as="h2"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="1.2"
        >
          使用{' '}
          <Box
            as="mark"
            bg="unset"
            color={useColorModeValue('blue.600', 'blue.200')}
            whiteSpace="nowrap"
          >
            API7
          </Box>
          {' '}为您的产品赋能
        </Heading>
        <Text fontSize="lg" maxW="xl" mx="auto">
          灵活可靠的企业级 API 网关将作为您的流量管理平台，减少通用组件研发、保障您的业务稳定。
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mt="10"
          justify="center"
          spacing={{ base: '3', md: '5' }}
          maxW="md"
          mx="auto"
        >
          <Button
            as="a"
            href="/form-api7-trial"
            size="lg"
            h="16"
            px="10"
            colorScheme="blue"
            fontWeight="bold"
            flex={{ md: '1' }}
          >
            预约演示
          </Button>
          <Button
            as="a"
            flex={{ md: '1' }}
            variant="outline"
            href="mailto:wenming@api7.ai"
            size="lg"
            h="16"
            px="10"
            fontWeight="bold"
          >
            与网关专家聊一聊
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
