import { Box, HStack, Text } from '@chakra-ui/react'
import * as React from 'react'
import { IoShapes } from 'react-icons/io5'

export const SampleLogo = () => (
  <HStack spacing="3">
    <Box as={IoShapes} fontSize="3xl" />
    <Text textTransform="uppercase" fontWeight="bold">
      Logo
    </Text>
  </HStack>
)
