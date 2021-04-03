import {
  Box,
  Button,
  Center,
  Heading,
  Img,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { withTranslation } from 'i18n'
import * as React from 'react'
import { I18nContext, TFunction } from "next-i18next";
import { NextPage } from "next";

type Props = {
  t: TFunction;
};

const App: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: {
      language
    }
  } = React.useContext(I18nContext)
  return (
    <Box as="section" bg={mode('gray.100', 'gray.800')} py="20">
      <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
        <Stack spacing={{ base: '4', lg: '20' }} direction={{ base: 'column', lg: 'row' }}>
          <Box maxW={{ lg: 'lg' }}>
            <Heading
              size="xl"
              mt="10"
              fontWeight="extrabold"
              letterSpacing="tight"
              lineHeight="normal"
            >
              {t("home-text23")}
            </Heading>
            <Text fontSize="lg" mt="6" color={mode('gray.600', 'gray.400')} textAlign="start">
              {t("home-text24")}
            </Text>
          </Box>
          <Center flex="1" minH={[0, 420]} maxW={{ lg: 'xl' }}>
            <Img
              objectFit="contain"
              w="full"
              h="full"
              htmlWidth="576px"
              htmlHeight="420px"
              src={`https://api7-website-1301662268.file.myqcloud.com/low-code-api-gateway-example-${language}.gif`}
              alt="Low-Code API Gateway"
            />
          </Center>
        </Stack>
      </Box>
    </Box>
  )
}

App.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(App);
