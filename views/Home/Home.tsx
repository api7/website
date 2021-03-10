import React, { useContext } from "react";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";
import { NextPage } from "next";
import HomeFeature1 from '@/components/HomeFeature1'
import HomeFeature2 from '@/components/HomeFeature2'
import HomeHero from '@/components/HomeHero'
import HomeLogoWall from '@/components/HomeLogoWall'
import Newsletter from '@/components/Newsletter'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { withTranslation } from "../../i18n";
import HomeBanner from "@/components/HomeBanner";

type Props = {
  t: TFunction;
};

const Home: NextPage<Props, any> = ({ t }) => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  const certs =
    language === "en-US"
      ? [
        {
          name: t("home-text10"),
          src: "https://static.apiseven.com/logo-linux-silver-member.png",
          href: "https://www.linuxfoundation.org/",
        },
        {
          name: t("home-text11"),
          src: "https://static.apiseven.com/logo-tars-foundation.png",
          href: "https://tarscloud.org/",
        },
      ]
      : [
        {
          name: t("home-text8"),
          src: "https://static.apiseven.com/logo-huawei-compatible.png",
          href: "/zh/cert/huawei-stack-8.0",
        },
        {
          name: t("home-text9"),
          src: "https://static.apiseven.com/logo-huawei-compatible.png",
          href: "/zh/cert/huawei-kunpeng",
        }, {
          name: t("home-text12"),
          src: "https://static.apiseven.com/%E5%8F%AF%E4%BF%A1%E4%BA%91.jpeg",
          href: "/zh/cert/trusted-cloud"
        }
      ];

  return (
    <>
      <NextSeo title={t("common:homepage")} />
      <HomeBanner />
      <Navbar />
      <HomeHero />
      <HomeFeature2 />
      <HomeFeature1 />
      <HomeLogoWall />
      <Newsletter />
      <Footer />
    </>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(Home);
