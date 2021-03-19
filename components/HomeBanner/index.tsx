import { Box, IconButton, Text } from '@chakra-ui/react'
import { HiX } from 'react-icons/hi'
import { withTranslation } from 'i18n'
import React from "react";
import { TFunction } from "next-i18next";
import { NextPage } from "next";

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  return (
    <Box as="header" bgGradient="linear(to-r, blue.500, purple.500)" color="white" py="2">
      <Text px="10" align={{ base: 'start', md: 'center' }} fontSize="sm" position="relative">
        <b>{t("text4")}</b>
        <Box
          as="a"
          href="https://github.com/apache/apisix-ingress-controller"
          target="_blank"
          py="1"
          px="4"
          mx={{ base: '3', md: '5' }}
          bg="white"
          color="blue.600"
          fontWeight="semibold"
          fontSize="xs"
          rounded="sm"
          whiteSpace="nowrap"
        >
          {t("text5")}
        </Box>
        <IconButton
          position={{ base: 'absolute', md: 'relative' }}
          insetEnd="3"
          top="0"
          size="sm"
          fontSize="1.5em"
          variant="unstyled"
          display="inline-flex"
          aria-label="Close Banner"
          icon={<HiX />}
        />
      </Text>
    </Box>
  )
}

App.getInitialProps = async () => ({
  namespacesRequired: ["common"],
});

export default withTranslation("common")(App);
