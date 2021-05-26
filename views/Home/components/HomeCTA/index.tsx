import { Box, Button, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from "react";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";
import { NextPage } from "next";
import { withTranslation } from 'i18n';

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  return (
    <Box as="section">
      <Box
        maxW="3xl"
        mx="auto"
        px={{ base: '6', lg: '8' }}
        py={{ base: '16', sm: '20' }}
        textAlign="center"
      >
        <Text fontWeight="semibold" color={useColorModeValue('blue.600', 'blue.200')}>
          {t("home-text25")}
        </Text>
        <Heading
          my="4"
          as="h2"
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight="extrabold"
          letterSpacing="tight"
          lineHeight="1.2"
        >
          {t("home-text26")}
          <Box
            as="mark"
            bg="unset"
            color={useColorModeValue('blue.600', 'blue.200')}
            whiteSpace="nowrap"
          >
            {t("home-text27")}
          </Box>
          {t("home-text28")}
        </Heading>
        <Text fontSize="lg" maxW="xl" mx="auto">
          {t("home-text31")}
        </Text>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mt="10"
          justify="center"
          spacing={{ base: '3', md: '5' }}
          maxW="md"
          mx="auto"
        >
          <Button
            as="a"
            href="/form-api7-trial"
            size="lg"
            h="16"
            px="10"
            colorScheme="blue"
            fontWeight="bold"
            flex={{ md: '1' }}
            _hover={{ color: "var(--chakra-colors-white)", background: "var(--chakra-colors-blue-600)", textDecoration: "none" }}
          >
            {t("home-text29")}
          </Button>
          <Button
            as="a"
            flex={{ md: '1' }}
            variant="outline"
            href="mailto:support@api7.ai"
            size="lg"
            h="16"
            px="10"
            fontWeight="bold"
            _hover={{ color: "#1A202C", background: "var(--chakra-colors-gray-100)", textDecoration: "none" }}
          >
            {t("home-text30")}
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

App.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(App);

