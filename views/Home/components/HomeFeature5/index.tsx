import {
  Heading, Box, Stack, Text, useColorModeValue, StackDivider, useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { FaHeart } from 'react-icons/fa'
import { NextPage } from 'next'
import { TFunction } from "next-i18next";

import { Stat } from './Stat'
import { withTranslation } from '../../../../i18n'

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => (
  <>
    <Box as="section" maxW="7xl" mx="auto" px={{ base: '6', md: '8' }} py={{ base: '12', md: '20' }}>
      <Box mb="12" textAlign="center">
        <Heading size="2xl" fontWeight="extrabold" lineHeight="normal">
          {t("home-text14")} <Box
            display="inline-block"
            mx="1"
            color={mode('blue.500', 'blue.300')}
            fontSize="2xl"
            role="img"
            aria-label="Love"
            as={FaHeart}
          /> {t("home-text15")}
        </Heading>
        <Text
          fontSize="lg"
          mt="4"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'whiteAlpha.700')}
        >
          {t("home-text16")}
          <Box as="a" href="https://apisix.apache.org/" target="_blank">
            {t("home-text17")}
          </Box>
          {t("home-text18")}
        </Text>
      </Box>
      <Stack spacing="8" direction={{ base: 'column', md: 'row' }} divider={<StackDivider />}>
        <Stat title={t("home-text19")} value="200+" />
        <Stat title="GitHub Stars" value="4,700+" />
        <Stat title={t("home-text20")} value="150,000+" />
      </Stack>
    </Box>
  </>
)

App.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(App)
