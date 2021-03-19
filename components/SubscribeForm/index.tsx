import {
  Box,
  Button,
  FormControl,
  Input,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

export const SubscribeForm = () => (
  <form id="subscribe-form" method="post" action="https://tinyletter.com/api7">
    <Box mt="8" display={{ md: 'flex' }} maxW="xl">
      <FormControl id="email" marginEnd="-1px">
        <Input
          roundedEnd={{ md: '0' }}
          mb={{ base: '2', lg: '0' }}
          flex="1"
          bg={mode('white', 'gray.900')}
          placeholder="Work email"
          type="email"
          id="email"
          name="email"
        />
      </FormControl>
      <Button
        w={{ base: 'full', md: 'auto' }}
        fontSize="sm"
        px="8"
        roundedStart={{ md: '0' }}
        colorScheme="blue"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wide"
        type="submit"
      >
        Subscribe
      </Button>
    </Box>
  </form>
)
