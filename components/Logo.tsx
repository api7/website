import { HTMLChakraProps, Box, Image } from '@chakra-ui/react'
import * as React from 'react'

export const Logo = () => {
  return (
    <Box as="a" href="/">
      <Image src="https://static.apiseven.com/2020/05/Jietu20200312-103300-removebg-preview.png" alt="Logo" width="100px" />
    </Box>
  )
}
