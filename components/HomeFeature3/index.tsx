import { Heading, SimpleGrid, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'
import { Stat } from './Stat'

const App = () => (
  <Stack
    as="section"
    maxW="7xl"
    mx="auto"
    px={{ base: '6', md: '8' }}
    py={{ base: '12', md: '20' }}
    spacing="12"
  >
    <Stack maxW="xl" spacing="6">
      <Heading size="2xl" fontWeight="extrabold">
        基于由社区驱动的开源软件
      </Heading>
      <Text
        fontSize="lg"
        fontWeight="medium"
        color={useColorModeValue('gray.600', 'whiteAlpha.700')}
      >
        为全球领先企业所信任，活跃的社区与优秀的贡献者是成功的关键。
      </Text>
    </Stack>
    <SimpleGrid mx="auto" spacing={{ base: '10', md: '20' }} columns={{ base: 1, md: 3 }}>
      <Stat
        title="Mobile revenue"
        value="+30%"
        accentColor={useColorModeValue('green.500', 'green.300')}
      >
        Amet minim mollit non deserunt ullamco est sit aliqua dolor.
      </Stat>
      <Stat
        title="New customers"
        value="34K"
        accentColor={useColorModeValue('blue.500', 'blue.300')}
      >
        Amet minim mollit non deserunt ullamco est sit aliqua dolor.
      </Stat>
      <Stat
        title="Last year’s revenue"
        value="$234K"
        accentColor={useColorModeValue('pink.500', 'pink.300')}
      >
        Amet minim mollit non deserunt ullamco est sit aliqua dolor.
      </Stat>
    </SimpleGrid>
  </Stack>
)

export default App