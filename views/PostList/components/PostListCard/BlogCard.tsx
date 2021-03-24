import { Box, BoxProps, Heading, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { BlogAuthor } from './BlogAuthor'
import { BlogMedia } from './BlogMedia'
import { BlogMeta, BlogMetaProps } from './BlogMeta'

export interface BlogData {
  type: BlogMetaProps['type']
  tags: string[]
  title: string
  description?: string
  image: string
  path?: string
  date?: string | Date;
  author?: {
    name: string
    image: string
    title: string
  }
}

interface BlogCardProps extends BoxProps {
  data: BlogData
}

export const BlogCard = (props: BlogCardProps) => {
  const { data, ...rest } = props
  const { type, path = '#', author, title, tags, description, image } = data

  return (
    <Box {...rest}>
      <BlogMedia src={image} alt={title} />
      <Box mt="6" padding="0 20px">
        <BlogMeta tags={tags} type={type} />
        <Box mb="6">
          <Box as="a" href={path}>
            <Heading size="md" mt="6" mb="4">
              {title}
            </Heading>
          </Box>
          <Text color={mode('gray.600', 'gray.400')} lineHeight="tall" textAlign="justify">
            {description}
          </Text>
        </Box>
        {author && <BlogAuthor name={author.name} image={author.image} role={author.title} />}
      </Box>
    </Box>
  )
}
