import React, { useEffect } from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";
import data from "../../data/devcon.json";

type Props = {
  t: TFunction;
  list: Post[];
};

const Resources: NextPage<Props, any> = ({ t, list = [] }) => {
  useEffect(() => {
    for (let i = 0; i < list.length; i++) {
      const changeStyle = () => {
        if (show.className === "active") {
          show.removeAttribute("class");
        } else {
          show.setAttribute("class", "active");
        }
      };
      const show = document.getElementById(`role${i}`);
      show.addEventListener("click", changeStyle);
    }
  }, []);

  return (
    <SWrapper>
      <NextSeo title="Apache APISIX Devcon 2020" />
      <div>
        <Nav />
        <div className="cover">
          <div className="box"><h1>Apache APISIX Devcon 2020</h1></div>
        </div>
        <section>
          <div className="container">
            <h2>视频列表</h2>
            <ul>
              {list.map((item, index) => (
                <li key={item.title}>
                  <div className="left">
                    <a className="title" href={item.path} target="blank">{item.title}</a>
                    <p className="speaker">{item.speaker}</p>
                  </div>
                  <div className="right"><a href={item.path} target="blank">观看视频</a></div>
                  <span id={`role${index}`}>
                    <a className="showButton"></a>
                  </span>
                  <div className="contentBox">
                    <div className="content">
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <FooterLinks />
        <Footer />
      </div>
    </SWrapper>
  );
};

Resources.getInitialProps = async (context) => {
  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = data["videos"][lng];

  return {
    namespacesRequired: ["common"],
    list: posts,
  };
};

export default withTranslation("resources")(Resources as any);
