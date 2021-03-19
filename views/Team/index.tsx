import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { withTranslation } from 'i18n'
import { NextSeo } from 'next-seo'
import React from "react";
import { TFunction } from "next-i18next";
import { NextPage } from "next";

import { Member } from './Member'
import { members } from './_data'

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => (
  <>
    <NextSeo title={t("team-text1")} />
    <Box as="section">
      <Box
        mx="auto"
        maxW={{ base: 'xl', md: '7xl' }}
        px={{ base: '6', md: '8' }}
        py={{ base: '12', md: '20' }}
      >
        <Box textAlign="center">
          <Heading size="3xl" letterSpacing="tight" mb="5" fontWeight="extrabold">
            {t("team-text1")}
          </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto">
            {t("team-text2")}
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
            {t("team-text3")}
          </Heading>
          <Text fontSize="xl" maxW="2xl" mx="auto">
            {t("team-text4")}
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

App.getInitialProps = async () => ({
  namespacesRequired: ["common", "team"],
});

export default withTranslation("team")(App);
