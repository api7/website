import { Box, IconButton, Text } from '@chakra-ui/react'
import * as React from 'react'
import { HiX } from 'react-icons/hi'

export default () => {
  return (
    <Box as="header" bgGradient="linear(to-r, blue.500, purple.500)" color="white" py="2">
      <Text px="10" align={{ base: 'start', md: 'center' }} fontSize="sm" position="relative">
        <b>Did you buy a license yet? </b>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        <Box
          as="a"
          href="#"
          target="_self"
          py="1"
          px="4"
          mx={{ base: '3', md: '5' }}
          bg="white"
          color="blue.600"
          fontWeight="semibold"
          fontSize="xs"
          rounded="sm"
          whiteSpace="nowrap"
        >
          Check it Out
        </Box>
        <IconButton
          position={{ base: 'absolute', md: 'relative' }}
          insetEnd="3"
          top="0"
          size="sm"
          fontSize="1.5em"
          variant="unstyled"
          display="inline-flex"
          aria-label="Close Banner"
          icon={<HiX />}
        />
      </Text>
    </Box>
  )
}