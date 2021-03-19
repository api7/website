import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import * as React from 'react'
import { Member } from './Member'
import { members } from './_data'

export const App = () => (
  <>
    <NextSeo title="People" />
    <Box as="section">
      <Box
        mx="auto"
        maxW={{ base: 'xl', md: '7xl' }}
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
      >
        <Box textAlign="center">
          <Heading size="3xl" letterSpacing="tight" mb="5" fontWeight="extrabold">
            People
        </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto">
            No one can whistle a symphony. It takes a whole orchestra to play it
        </Text>
        </Box>
        <SimpleGrid mt="20" columns={{ base: 1, md: 2, lg: 3 }} spacingX="6" spacingY="16">
          {members.filter(item => item.type === 'team').map((member, idx) => (
            <Member
              key={idx}
              role={member.role}
              image={member.image}
              name={member.name}
              twitter={member.twitter}
              linkedIn={member.linkedin}
              github={member.github}
            >
              {member.description}
            </Member>
          ))}
        </SimpleGrid>
      </Box>
      <Box
        mx="auto"
        maxW={{ base: 'xl', md: '7xl' }}
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
      >
        <Box textAlign="center">
          <Heading size="3xl" letterSpacing="tight" mb="5" fontWeight="extrabold">
            Advisors
        </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto">
            A successful team is a group of many hands and one mind
        </Text>
        </Box>
        <SimpleGrid mt="20" columns={{ base: 1, md: 2, lg: 3 }} spacingX="6" spacingY="16">
          {members.filter(item => item.type === 'adviser').map((member, idx) => (
            <Member
              key={idx}
              role={member.role}
              image={member.image}
              name={member.name}
              twitter={member.twitter}
              linkedIn={member.linkedin}
              github={member.github}
            >
              {member.description}
            </Member>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  </>
)

export default App
