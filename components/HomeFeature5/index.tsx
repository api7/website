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
          开源软件 <Box
            display="inline-block"
            mx="1"
            color={mode('blue.500', 'blue.300')}
            fontSize="2xl"
            role="img"
            aria-label="Love"
            as={FaHeart}
          /> 活跃社区
      </Heading>
        <Text
          fontSize="lg"
          mt="4"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'whiteAlpha.700')}
        >
          API7 基于{' '}
          <Box as="a" href="https://apisix.apache.org/" target="_blank">
            Apache APISIX
          </Box>
          {' '}
          构建，活跃的社区与优秀的贡献者是产品可靠的关键。
      </Text>
      </Box>
      <Stack spacing="8" direction={{ base: 'column', md: 'row' }} divider={<StackDivider />}>
        <Stat title="Amet minim mollit non deserunt ullamco." value="85%" />
        <Stat title="Amet minim mollit non deserunt ullamco." value="3/4" />
        <Stat title="Amet minim mollit non deserunt ullamco." value="45K" />
      </Stack>
    </Box>
  </>
)

export default App