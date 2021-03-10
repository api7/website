import {
  Box,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from '../Logo'
import { SocialLink } from './SocialLink'
import { links, socialLinks } from './_data'
import { LinkGroup } from './LinkGroup'
import { SubscribeForm } from './SubscribeForm'

export const App = () => (
  <Box as="footer" bg={mode('gray.50', 'gray.800')}>
    <Box
      maxW={{ base: 'xl', md: '7xl' }}
      mx="auto"
      px={{ base: '6', md: '8' }}
      py={{ base: '12', md: '20' }}
    >
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        mb={{ base: '10', lg: '16' }}
        align="flex-start"
        id="top"
      >
        <SimpleGrid
          flex="1"
          w={{ base: 'full', lg: 'auto' }}
          maxW={{ lg: '3xl' }}
          columns={{ base: 1, md: 2, lg: 4 }}
          fontSize="sm"
          marginEnd={{ md: '4', lg: '16' }}
        >
          {links.map((group, idx) => (
            <LinkGroup key={idx} data={group} />
          ))}
        </SimpleGrid>
        <Box
          flex="2"
          maxW={{ lg: '420px' }}
          ml={{ lg: 'auto' }}
          fontSize="sm"
          mt={{ base: '12', lg: 0 }}
        >
          <Text casing="uppercase" mb={{ base: 6, lg: 10 }} fontWeight="bold" letterSpacing="wide">
            Subscribe to our newsletter!
          </Text>
          <Text lineHeight="tall">
            Get Overflow resources, curated content, and design inspiration delivered straight into
            your inbox. Be the first to learn the news about new features and product updates.
          </Text>
          <SubscribeForm />
        </Box>
      </Flex>

      <Flex
        direction={{ base: 'column-reverse', lg: 'row' }}
        align={{ base: 'flex-start', lg: 'center' }}
        justify="space-between"
        fontSize="sm"
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '4', md: '12' }}
          mt={{ base: '8', lg: 0 }}
          w={{ base: 'full', lg: 'auto' }}
          justify={{ base: 'space-between', lg: 'flex-start' }}
          align={{ base: 'flex-start', md: 'center' }}
        >
          <Logo />
          <HStack spacing="2" mt={{ lg: '8' }} as="ul" listStyleType="none">
            {socialLinks.map((link, idx) => (
              <Box as="li" key={idx}>
                <SocialLink href={link.href}>
                  <Box srOnly>{link.label}</Box>
                  {link.icon}
                </SocialLink>
              </Box>
            ))}
          </HStack>
        </Stack>
        <Box>
          <Text>版权所有 &copy; {new Date().getFullYear()} 深圳支流科技有限公司 保留一切权利</Text>
          <Text mt="2">
            <Box as="a" href="https://beian.miit.gov.cn/#/Integrated/index">粤ICP备19060840号</Box>
          </Text>
        </Box>
      </Flex>
    </Box>
  </Box>
)

export default App