import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

export const SubscribeForm = () => (
  <form
    onSubmit={(e) => {
      e.preventDefault()
      // add submit logic
    }}
  >
    <Box mt="8" display={{ md: 'flex' }} maxW="xl">
      <FormControl id="email" marginEnd="-1px">
        <FormLabel srOnly>在此输入您的邮箱</FormLabel>
        <Input
          roundedEnd={{ md: '0' }}
          mb={{ base: '2', lg: '0' }}
          flex="1"
          bg={mode('white', 'gray.900')}
          placeholder="请输入您的邮箱"
        />
      </FormControl>
      <Button
        w={{ base: 'full', md: 'auto' }}
        fontSize="sm"
        px="8"
        roundedStart={{ md: '0' }}
        colorScheme="blue"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wide"
      >
        立即订阅
      </Button>
    </Box>
  </form>
)