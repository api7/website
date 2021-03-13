import { Box, Button, Heading, Text } from '@chakra-ui/react'
import * as React from 'react'

const App = () => {
  return (
    <Box as="section">
      <Box
        maxW="2xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '16', sm: '20' }}
        textAlign="center"
      >
        <Heading as="h2" size="3xl" fontWeight="extrabold" letterSpacing="tight">
          准备就绪？
        </Heading>
        <Button mt="8" as="a" href="#" size="lg" colorScheme="blue" fontWeight="bold">
          预约演示
        </Button>
      </Box>
    </Box>
  )
}

export default App