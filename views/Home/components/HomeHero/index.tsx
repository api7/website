import {
  Box,
  Image,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { withTranslation } from 'i18n';
import { NextPage } from 'next';
import { TFunction } from 'next-i18next';
import * as React from 'react'
import { I18nContext } from "react-i18next";

import { SubscribeForm } from '@/components/SubscribeForm'

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: { language },
  } = React.useContext(I18nContext);

  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} pt="24" pb="12" overflow="hidden">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack
          align="flex-start"
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: '20', lg: '8' }}
          justify="center"
          mb="20"
        >
          <Box flex="1" maxW={{ lg: '2xl' }} pt="10">
            <Heading as="h1" size="3xl" mt="8" fontWeight="extrabold">
              {t("home-block1-title")}
            </Heading>
            <Text color={mode('gray.600', 'gray.400')} mt="25" fontSize="xl">
              {t("home-block1-desc")}
            </Text>
            <SubscribeForm language={language} />
          </Box>
        </Stack>
      </Box>
      <Box as="section" pt={{ base: '30' }}>
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <SimpleGrid
            columns={{ base: 2, md: 2, lg: 6 }}
            color="gray.500"
            alignItems="center"
            justifyItems="center"
            spacing={{ base: '12', lg: '12' }}
            fontSize="2xl"
          >
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/airwallex.svg" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/efactoryfoundation.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/taikang-full.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/nasa.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/weibo-full.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/202103/TravelSky2.png" maxHeight="60px" />

            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/tencent.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/qingcloud.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/chinamobile.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/naixue-full.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/xdf3.png" maxHeight="60px" />
            <Image src="https://api7-website-1301662268.file.myqcloud.com/20210330/tal.png" maxHeight="60px" />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}

App.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(App);