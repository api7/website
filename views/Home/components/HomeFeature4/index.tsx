import { Box, Heading, SimpleGrid, Text, useColorModeValue as mode } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { NextPage } from 'next'
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";

import { EN_US_data, ZH_CN_data } from './_data'
import { BlogCard } from './BlogCard'
import { withTranslation } from '../../../../i18n'

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  const data = language === "zh-CN" ? ZH_CN_data : EN_US_data

  return (
    <Box bg={mode('gray.50', 'inherit')} as="section" py="24">
      <Box maxW={{ base: 'xl', md: '2xl', lg: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Box textAlign="center" maxW="md" mx="auto">
          <Heading size="2xl" fontWeight="extrabold" letterSpacing="tight">
            {t("home-text13")}
          </Heading>
          <Text mt="4" fontSize="lg" color={mode('gray.600', 'gray.400')}></Text>
        </Box>
        <SimpleGrid mt="14" columns={{ base: 1, lg: 3 }} spacing="14">
          {data.map((item, index) => (
            <BlogCard key={index} data={item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

App.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(App)
