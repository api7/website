import { Box, SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'
import { FcDoughnutChart, FcMultipleDevices, FcPrivacy, FcTimeline } from 'react-icons/fc'
import { Feature } from './Feature'

const App = () => {
  return (
    <Box as="section" py="24">
      <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY="14">
          <Feature title="Secure by default" icon={<FcPrivacy />}>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus.
          </Feature>
          <Feature title="Always up to date" icon={<FcTimeline />}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore.
          </Feature>
          <Feature title="Incredible statistics" icon={<FcDoughnutChart />}>
            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea takimata sanctus.
          </Feature>
          <Feature title="Support for multiple devices" icon={<FcMultipleDevices />}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore.
          </Feature>
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default App
