import React, { useContext } from "react";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";
import { NextPage } from "next";

import HomeFeature2 from './components/HomeFeature2'
import HomeFeature3 from './components/HomeFeature3'
import HomeFeature4 from './components/HomeFeature4'
import HomeFeature5 from './components/HomeFeature5'
import HomeHero from './components/HomeHero'

import { withTranslation } from "../../i18n";
import HomeCTA from "@/views/Home/components/HomeCTA";
import HomeCertificates from "./components/HomeCertificates";

type Props = {
  t: TFunction;
};

const Home: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  return (
    <>
      <NextSeo title={t("common:homepage")} />

      <HomeHero />
      <HomeFeature2 />
      <HomeFeature3 />
      <HomeFeature5 />
      <HomeCertificates />
      <HomeFeature4 />
      <HomeCTA />
    </>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(Home);
