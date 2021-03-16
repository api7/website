import React from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";
import data from "../../data/news.json";

type Props = {
  t: TFunction;
  list: Post[];
};

const News: NextPage<Props, any> = ({ t, list = [] }) => {
  return (
    <SWrapper>
      <NextSeo title={t(`common:news`)} />
      <div>
        <div className="cover">
          <div className="box">
            <h1>{t(`common:news`)}</h1>
          </div>
        </div>
        <div className="container">
          {list.map((item) => (
            <div className="listItem" key={item.title}>
              <div className="logo">
                <img src={item.logo} />
              </div>
              <div className="textTitle">
                <span>{item.date}</span>
                <a href={item.url} target="_blank">
                  <h2>{item.title}</h2>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SWrapper>
  );
};

News.getInitialProps = async (context) => {
  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = data["news"][lng];

  return {
    namespacesRequired: ["common"],
    list: posts,
  };
};

export default withTranslation("news")(News as any);
