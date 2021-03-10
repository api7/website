import React, { useContext } from "react";
import { NextSeo } from "next-seo";
import { TFunction } from "next-i18next";
import { I18nContext } from "react-i18next";
import { NextPage } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { withTranslation } from "../../i18n";

import { SBlock1, SSection, SBlock2, SButton, SPluginChart } from "./style";

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
      <Navbar />
      <SBlock1>
        <span>{t("home-block1-title")}</span>
        <br />
        <span>{t("home-block1-desc")}</span>
        <div className="mask"></div>
      </SBlock1>
      <SSection>
        <span className="title">{t("home-text1")}</span>
        <SPluginChart>
          <div className="left">
            <div className="gif">
              <img
                src={`https://static.apiseven.com/low-code-api-gateway-example-${language}.gif`}
                alt="low-code-api-gateway-example"
              />
            </div>
          </div>
          <div className="right">
            <div className="desc">
              <p>{t("home-text2")}</p>
              <p>{t("home-text3")}</p>
              <p>{t("home-text4")}</p>
            </div>
            <div className="video-button">
              <SButton>
                <a
                  href={`https://static.apiseven.com/low-code-api-gateway-example-${language}.mp4`}
                  target="_blank"
                >
                  {t("home-text5")}
                </a>
              </SButton>
            </div>
          </div>
        </SPluginChart>
      </SSection>
      <SSection>
        <span className="title">{t("home-block5-title")}</span>
        <span className="desc">{t("home-block5-desc")}</span>
        <img
          className="block-2-img"
          src="https://static.apiseven.com/2020/05/1594881772-Canvas-1.png"
          alt=""
        />
        <div className="feature-list">
          <div className="feature-item">
            <span className="title">{t("home-block5-feature1-title")}</span>
            <img
              src="https://static.apiseven.com/2020/05/mouse-globe.png"
              alt=""
            />
            <span className="desc">{t("home-block5-feature1-desc")}</span>
            <SButton>
              <a
                href="http://www3.apiseven.com/api-%e7%bd%91%e5%85%b3-apache-apisix-%e5%92%8c-kong-%e7%9a%84%e9%80%89%e5%9e%8b%e5%af%b9%e6%af%94/"
                target="_blank"
              >
                {t("home-block5-feature1-button")}
              </a>
            </SButton>
          </div>
          <div className="feature-item">
            <span className="title">{t("home-block5-feature2-title")}</span>
            <img
              src="https://static.apiseven.com/2020/05/laptop-cloud.png"
              alt=""
            />
            <span className="desc">{t("home-block5-feature2-desc")}</span>
            <SButton>
              <a
                href="http://www3.apiseven.com/category/%e7%94%a8%e6%88%b7%e6%a1%88%e4%be%8b/"
                target="_blank"
              >
                {t("home-block5-feature2-button")}
              </a>
            </SButton>
          </div>
          <div className="feature-item">
            <span className="title">{t("home-block5-feature3-title")}</span>
            <img
              src="https://static.apiseven.com/2020/05/plug-cloud.png"
              alt=""
            />
            <span className="desc">{t("home-block5-feature3-desc")}</span>
            <SButton>
              <a
                href="https://www.apiseven.com/apisix-vs-api7"
                target="_blank"
              >
                {t("home-block5-feature3-button")}
              </a>
            </SButton>
          </div>
        </div>
      </SSection>
      <SSection>
        <span className="title">{t("home-block3-title")}</span>
        <div className="showcases">
          <div>
            <img
              src="https://static.apiseven.com/2020/05/WechatIMG618.png"
              alt=""
            />
          </div>
          <div>
            <img src="https://static.apiseven.com/2020/05/NASA.png" alt="" />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/%E4%B8%AD%E5%9B%BD%E8%88%AA%E4%BF%A1.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/HelloTalk.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/1588907633-WechatIMG630.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/%E8%85%BE%E8%AE%AF%E4%BA%91-768x273.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/1588840167-airwallexreview.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/1588907762-WechatIMG2916.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/1588907453-ezgif-3-6c2dbe3cc8cd.png"
              alt=""
            />
          </div>
          <div>
            <img
              src="https://static.apiseven.com/2020/05/1588907670-WechatIMG631.png"
              alt=""
            />
          </div>
        </div>
      </SSection>
      <SSection>
        <span className="title">{t("home-text6")}</span>
        {language === "zh-CN" && (
          <span className="desc">{t("home-text7")}</span>
        )}
        <div className="cert-list">
          {certs.map(({ name, src, href }) => (
            <a href={href} target="_blank" key={name}>
              <img src={src} alt={name} />
              <span>{name}</span>
            </a>
          ))}
        </div>
      </SSection>
      <SBlock2>
        <div>
          <span>{t("home-block4-title")}</span>
          <SButton>
            <a href="https://www.apiseven.com/form-api7-trial" target="_blank">
              {t("home-block4-button")}
            </a>
          </SButton>
        </div>
      </SBlock2>
      <Footer />
    </>
  );
};

Home.getInitialProps = async () => ({
  namespacesRequired: ["common", "home"],
});

export default withTranslation("home")(Home);
