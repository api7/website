import {
  Badge,
  Box,
  HStack,
  Stack,
  StackDivider,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

interface BlogMetaProps {
  type: 'article' | 'webinar' | 'video'
  tags: string[]
}

const colors: Record<BlogMetaProps['type'], string> = {
  article: 'blue',
  webinar: 'red',
  video: 'purple',
}

export const BlogMeta = (props: BlogMetaProps) => {
  const { type, tags } = props
  return (
    <Stack
      spacing={{ base: '4', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
      textTransform="uppercase"
      fontSize="xs"
      letterSpacing="wider"
      fontWeight="semibold"
    >
      <Badge alignSelf="flex-start" colorScheme={colors[type]} variant="solid">
        {type}
      </Badge>
      <HStack
        divider={<StackDivider h="3" alignSelf="center" />}
        spacing="3"
        color={mode('gray.600', 'gray.400')}
      >
        {tags.map((tag, index) => (
          <Box key={index}>{tag}</Box>
        ))}
      </HStack>
    </Stack>
  )
}
