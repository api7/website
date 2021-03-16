import {
  Box,
  Flex,
  HStack,
  Img,
  Link,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'

interface Props {
  image: string
  name: string
  role: string
  twitter?: string
  linkedIn?: string
  github?: string
  children: React.ReactNode
}

export const Member = (props: Props) => {
  const { image, name, role, twitter, linkedIn, github, children } = props
  return (
    <Flex direction="column" align="center" textAlign="center">
      <Img alt={name} w="40" h="40" rounded="full" objectFit="cover" src={image} />
      <Box mt="4">
        <Text fontWeight="bold" fontSize="lg">
          {name}
        </Text>
        <Text fontWeight="semibold" color={useColorModeValue('gray.500', 'whiteAlpha.700')}>
          {role}
        </Text>
      </Box>
      <Text
        mt="2"
        color={useColorModeValue('gray.600', 'whiteAlpha.900')}
        maxW={{ base: 'unset', md: '20rem' }}
      >
        {children}
      </Text>
      <HStack mt="5" spacing="3">
        {twitter && (
          <Link isExternal color={useColorModeValue('blue.600', 'blue.300')} href={twitter}>
            <VisuallyHidden>{`${name}'s Twitter page`}</VisuallyHidden>
            <FaTwitter aria-hidden />
          </Link>
        )}
        {linkedIn && (
          <Link isExternal color={useColorModeValue('blue.600', 'blue.300')} href={linkedIn}>
            <VisuallyHidden>{`${name}'s Linkedin page`}</VisuallyHidden>
            <FaLinkedinIn aria-hidden />
          </Link>
        )}
        {github && (
          <Link isExternal color={useColorModeValue('blue.600', 'blue.300')} href={github}>
            <VisuallyHidden>{`${name}'s GitHub page`}</VisuallyHidden>
            <FaGithub aria-hidden />
          </Link>
        )}
      </HStack>
    </Flex>
  )
}
