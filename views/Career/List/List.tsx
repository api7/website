import React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";
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
      title: "客户成功架构师",
      description: "有丰富的软件开发和运维相关工作经验。",
      href: "/careers/customer-success-architect",
      type: t("career-card-name2")
    },
    {
      title: "技术文档工程师",
      description: "负责公司产品用户手册、操作手册等相关内容的策划编写及维护。",
      href: "/careers/technical-writer",
      type: t("career-card-name2")
    },
    {
      title: "开发者关系和生态负责人",
      description: "与开源社区成员进行各种联系，无论是面对面、博客、论坛，还是其他社交渠道和活动。",
      href: "/careers/head-of-developer-relations-and-ecology",
      type: t("career-card-name2")
    },
    {
      title: "服务端开发工程师（实习）",
      description: "完成 Apache APISIX 以及周边开源项目的开发任务。",
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
        <Navbar />
        <div className="elementor-section-wrap">
          <SSection1>
            <div className="background-overlay"></div>
            <div className="container">
              <div className="row">
                <h2 className="heading-title">
                  {t("career-block1-title")}
                  <br /> {t("career-block1-desc")}
                </h2>
                <div className="button-wrapper">
                  <a href="#courses" className="elementor-button" role="button">
                    {" "}
                    <span className="elementor-button-content-wrapper">
                      {t("career-text1")}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SSection1>
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
          <Footer />
        </div>
      </div>
    </>
  );
};

CareerList.getInitialProps = async () => ({
  namespacesRequired: ["common", "career"],
});

export default withTranslation("career")(CareerList);
