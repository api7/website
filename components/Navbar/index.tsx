import { Box, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";

import { NavContent } from './NavContent'
import { withTranslation } from '../../i18n';
import { EN_US_Links, ZH_CN_Links } from './_data';

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  const links = language === "zh-CN" ? ZH_CN_Links : EN_US_Links

  return (
    <Box minH="0">
      <Box as="header" bg={mode('white', 'gray.800')} position="relative" zIndex="10">
        <Box as="nav" aria-label="Main navigation" maxW="7xl" mx="auto" px={{ base: '6', md: '8' }}>
          <NavContent.Mobile display={{ base: 'flex', lg: 'none' }} links={links} language={language} />
          <NavContent.Desktop display={{ base: 'none', lg: 'flex' }} links={links} language={language} />
        </Box>
      </Box>
    </Box>
  )
}

export default withTranslation("common")(App)
