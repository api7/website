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
          Prices now start at just $23/month
        </Text>
        <Heading
          my="4"
          as="h2"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="1.2"
        >
          Get your dev team working with{' '}
          <Box
            as="mark"
            bg="unset"
            color={useColorModeValue('blue.600', 'blue.200')}
            whiteSpace="nowrap"
          >
            Chakra UI
          </Box>
        </Heading>
        <Text fontSize="lg" maxW="xl" mx="auto">
          Your business is going places - are your products? Ship products to customers with speed
          using Chakra UI Pro
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
            href="#"
            size="lg"
            h="16"
            px="10"
            colorScheme="blue"
            fontWeight="bold"
            flex={{ md: '1' }}
          >
            Get started free
          </Button>
          <Button
            as="a"
            flex={{ md: '1' }}
            variant="outline"
            href="#"
            size="lg"
            h="16"
            px="10"
            fontWeight="bold"
          >
            Talk to an expert
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default App
