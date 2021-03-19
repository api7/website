import React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";

import { withTranslation } from "../../../i18n";
import {
  SSection1,
  SSection2,
  SSection3,
  SCard,
  SType,
  SContent1,
  SContent2,
  SName,
  SDescription,
  SButton,
  SContainer,
} from "./style";

type Props = {
  t: TFunction;
};

const CareerList: NextPage<Props, any> = ({ t }) => {
  const list = [
    {
      title: t("career-card-title9"),
      description: t("career-card-desc9"),
      href: "/careers/customer-success-architect",
      type: t("career-card-name2")
    },
    {
      title: t("career-card-title8"),
      description: t("career-card-desc8"),
      href: "/careers/technical-writer",
      type: t("career-card-name2")
    },
    {
      title: t("career-card-title7"),
      description: t("career-card-desc7"),
      href: "/careers/head-of-developer-relations-and-ecology",
      type: t("career-card-name2")
    },
    {
      title: t("career-card-title6"),
      description: t("career-card-desc6"),
      href: "/careers/server-development-engineer",
      type: t("career-card-name")
    },
    {
      title: t("career-card-title5"),
      description: t("career-card-desc5"),
      href: "/careers/head-of-growth",
      type: t("career-card-name2")
    },
    {
      title: t("career-card-title1"),
      description: t("career-card-desc1"),
      href: "/careers/technical-support-engineer",
      type: t("career-card-name")
    },
    {
      title: t("career-card-title2"),
      description: t("career-card-desc2"),
      href: "/careers/senior-nginx-development-engineer",
      type: t("career-card-name")
    },
    {
      title: t("career-card-title3"),
      description: t("career-card-desc3"),
      href: "/careers/senior-development-engineer",
      type: t("career-card-name")
    },
    {
      title: t("career-card-title4"),
      description: t("career-card-desc4"),
      href: "/careers/go-engineer",
      type: t("career-card-name")
    },
  ];

  return (
    <>
      <NextSeo title={t("common:job")} />
      <div className="wrapper default">
        <div className="elementor-section-wrap">
          <SSection2>
            <div className="widget-wrap">
              <div id="courses" className="menu-anchor"></div>
            </div>
            <SSection3>
              <div className="elementor-container">
                <div className="elementor-row">
                  {list.map((item) => (
                    <SCard key={item.href}>
                      <SType>{item.type}</SType>
                      <SContainer>
                        <SContent1>
                          <SName>{item.title}</SName>
                          <SDescription>{item.description}</SDescription>
                        </SContent1>
                        <SContent2>
                          <SName>{item.title}</SName>
                          <SDescription>{item.description}</SDescription>
                          <a href={item.href} target="_blank">
                            <SButton>{t("career-text2")}</SButton>
                          </a>
                        </SContent2>
                      </SContainer>
                    </SCard>
                  ))}
                </div>
              </div>
            </SSection3>
          </SSection2>
        </div>
      </div>
    </>
  );
};

CareerList.getInitialProps = async () => ({
  namespacesRequired: ["common", "career"],
});

export default withTranslation("career")(CareerList);
