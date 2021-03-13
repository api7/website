import { Box, BoxProps, Divider, Flex, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

interface StatProps extends BoxProps {
  title: string
  value: string
  children: React.ReactNode
  accentColor?: string
}
export const Stat = (props: StatProps) => {
  const { title, value, children, accentColor, ...rest } = props
  return (
    <Box {...rest}>
      <Flex as="dl" direction="column-reverse">
        <Box as="dt" fontWeight="bold">
          {title}
        </Box>
        <Box
          order={1}
          as="dd"
          fontSize={{ base: '4xl', md: '5xl' }}
          fontWeight="extrabold"
          color={accentColor}
        >
          {value}
        </Box>
      </Flex>
      <Divider aria-hidden my="4" borderWidth="2px" borderColor={accentColor} />
      <Box color={useColorModeValue('gray.600', 'whiteAlpha.700')} fontWeight="medium">
        {children}
      </Box>
    </Box>
  )
}