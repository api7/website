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
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="2xl"
              mt="10"
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="normal"
            >
              Low-Code API Gateway
            </Heading>
            <Text fontSize="lg" mt="6" color={mode('gray.600', 'gray.400')} textAlign="justify">
              Low-code API gateway, processing traffic faster and more efficiently. From Developers to Operations, Quality Assurance and Security, and even PM, more than 40 plugins of Apache APISIX can work together to create your own plugin.
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
              Learn More
            </Button>
          </Box>
          <Center flex="1" shadow="lg" minH="26rem" maxW={{ lg: 'xl' }}>
            <Img
              objectFit="contain"
              w="full"
              h="full"
              htmlWidth="576px"
              htmlHeight="420px"
              src="https://static.apiseven.com/low-code-api-gateway-example-zh-CN.gif"
              alt="Low-Code API Gateway"
            />
          </Center>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
