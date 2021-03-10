import {
  Box,
  Button,
  Heading,
  Img,
  Input,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

const SubscribeForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        // your subscribe logic here
      }}
    >
      <Stack maxW="md" spacing="4" direction={{ base: 'column', sm: 'row' }}>
        <Input type="email" placeholder="在此输入您的邮箱" />
        <Button colorScheme="blue" px="10" type="submit">
          提交
        </Button>
      </Stack>
    </form>
  )
}

export default () => {
  return (
    <Box as="section" py="12">
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto">
        <Stack direction="row" justify="space-between" align="center" spacing="8">
          <Box maxW="2xl" p={{ base: '6', md: '12' }}>
            <Heading size="lg" fontWeight="extrabold" mb="2">
              订阅邮件
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mb="6">
              订阅 API7 邮件列表，及时获得产品最新动态。
            </Text>
            <SubscribeForm />
          </Box>
          <Box display={{ base: 'none', lg: 'block' }}>
            <Img
              src="https://images.unsplash.com/photo-1512626120412-faf41adb4874?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTR8fGVtYWlsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt=""
              htmlWidth="380"
              htmlHeight="256"
              height="auto"
              objectFit="cover"
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}