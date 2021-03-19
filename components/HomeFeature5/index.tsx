import {
  Heading, Box, Stack, Text, useColorModeValue, StackDivider, useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'

import { Stat } from './Stat'

const App = () => (
  <>
    <Box as="section" maxW="7xl" mx="auto" px={{ base: '6', md: '8' }} py={{ base: '12', md: '20' }}>
      <Box mb="12" textAlign="center">
        <Heading size="2xl" fontWeight="extrabold" lineHeight="normal">
          Open Source <Box
            display="inline-block"
            mx="1"
            color={mode('blue.500', 'blue.300')}
            fontSize="2xl"
            role="img"
            aria-label="Love"
            as={FaHeart}
          /> Active Community
      </Heading>
        <Text
          fontSize="lg"
          mt="4"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'whiteAlpha.700')}
        >
          An active community and great contributors are keys to our reliable products.
      </Text>
      </Box>
      <Stack spacing="8" direction={{ base: 'column', md: 'row' }} divider={<StackDivider />}>
        <Stat title="Contributors" value="200+" />
        <Stat title="GitHub Stars" value="4,700+" />
        <Stat title="Downloads" value="150,000+" />
      </Stack>
    </Box>
  </>
)

export default App