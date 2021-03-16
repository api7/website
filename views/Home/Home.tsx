import React, { useContext } from "react";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";
import { NextPage } from "next";

import HomeFeature2 from '@/components/HomeFeature2'
import HomeFeature3 from '@/components/HomeFeature3'
import HomeFeature4 from '@/components/HomeFeature4'
import HomeFeature5 from '@/components/HomeFeature5'
import HomeHero from '@/components/HomeHero'

import { withTranslation } from "../../i18n";
import HomeCTA from "@/components/HomeCTA";

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

      <HomeHero />
      <HomeFeature2 />
      <HomeFeature3 />
      <HomeFeature5 />
      <HomeFeature4 />
      <HomeCTA />
    </>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(Home);
