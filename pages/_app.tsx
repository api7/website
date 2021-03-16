import App from "next/app";
import type { AppProps, AppContext } from "next/app";
import { ThemeProvider } from "styled-components";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { TFunction } from "next-i18next";
import { ChakraProvider } from '@chakra-ui/react'

import HomeBanner from "@/components/HomeBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import theme, { GlobalStyle } from "../theme";
import { appWithTranslation, withTranslation } from "../i18n";

const MyApp = ({ Component, pageProps, t }: AppProps & { t: TFunction }) => {
  return (
    <ThemeProvider theme={theme}>
      <DefaultSeo
        title={t("company-name")}
        titleTemplate={`%s - ${t("company-name")}`}
        description={t("company-name")}
      />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ChakraProvider>
        <HomeBanner />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(withTranslation("common")(MyApp as any));
