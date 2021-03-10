import React from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";
import blogData from "../../data/blog.json"
import usercaseData from "../../data/usercase.json"

type Props = {
  t: TFunction;
  type: "usercases" | "blog";
  list: Post[];
};

const PostList: NextPage<Props, any> = ({ t, type, list = [] }) => {
  return (
    <SWrapper>
      <NextSeo title={t(`common:${type}`)} />
      <div>
        <Navbar />
        <div className="cover">
          <div className="background"></div>
          <div className="box">
            <h1>{t(`common:${type}`)}</h1>
          </div>
        </div>
        <div className="slogan">
          <p>
            {t("about:about-box-desc4")}
          </p>
        </div>
        <div className="cards">
          {list.map((item) => (
            <div className="card" key={item.title}>
              <img src={item.cover} alt="" />
              <a href={item.path} target="_blank">
                <h2>{item.title}</h2>
              </a>
            </div>
          ))}
        </div>
        <FooterLinks />
        <Footer />
      </div>
    </SWrapper>
  );
};

PostList.getInitialProps = async (context) => {
  const { pathname } = context;
  let type = pathname.slice(1);

  if (type === "usercases") {
    type = "usercase";
  }

  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = type === "blog" ? blogData[lng] : usercaseData[lng];

  return {
    namespacesRequired: ["common", "about"],
    type,
    list: posts,
  };
};

export default withTranslation("postlist")(PostList as any);
