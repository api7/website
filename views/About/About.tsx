import React, { useContext } from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { I18nContext } from "react-i18next";

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";
import data from "../../data/about.json";
import { getRequestDemoLink } from '../../helper'

type Props = {
  t: TFunction;
  list: Post[];
};

const About: NextPage<Props, any> = ({ t, list = [] }) => {
  const {
    i18n: { language },
  } = useContext(I18nContext);

  return (
    <SWrapper>
      <NextSeo title={t(`common:about`)} />
      <div>
        <div className="cover">
          <div className="box">
            <h1>{t(`common:about`)}</h1>
          </div>
        </div>
        <div className="boxdesc">
          <div className="desc">
            <p>{t("about-box-desc1")}</p>
            <p>{t("about-box-desc2")}</p>
            <p>{t("about-box-desc3")}</p>
            <p>{t("about-box-desc4")}</p>
          </div>
          <a href="/careers" target="_blank">
            <button>
              <span>{t("about-box-button")}</span>
            </button>
          </a>
        </div>
        <div className="container">
          <h2>{t("about-title2")}</h2>
          <VerticalTimeline>
            {list.map((item, index) => (
              <VerticalTimelineElement
                className="timeline"
                key={index}
                contentStyle={{ background: "#fff", color: "black" }}
                contentArrowStyle={{
                  borderRight: "7px solid #fff",
                }}
                iconStyle={{
                  width: "20px",
                  height: "20px",
                  marginTop: "20px",
                  marginLeft: "-11px",
                  background: "rgb(33, 150, 243)",
                  color: "#fff",
                }}
              >
                <div className="datebox">{item.date}</div>
                <p>{item.desc}</p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
        <div className="boxdesc">
          <h2>{t("about-title3")}</h2>
          <div className="desc">
            <p>{t("about-box-desc5")}</p>
            <p>{t("about-box-desc6")}</p>
            <p>{t("about-box-desc7")}</p>
          </div>
          <div className="detial">
            <div>
              <div className="imgbox">
                <img
                  src="https://static.apiseven.com/web_developer_isometric.svg"
                  alt=""
                />
              </div>
              <h3>{t("about-item1")}</h3>
              <p>{t("about-item-text1")}</p>
            </div>
            <div>
              <div className="imgbox">
                <img
                  src="https://static.apiseven.com/yoga_position_isometric.svg"
                  alt=""
                />
              </div>
              <h3>{t("about-item2")}</h3>
              <p>{t("about-item-text2")}</p>
            </div>
            <div>
              <div className="imgbox">
                <img
                  src="https://static.apiseven.com/lunch_break_monochromatic.svg"
                  alt=""
                />
              </div>
              <h3>{t("about-item3")}</h3>
              <p>{t("about-item-text3")}</p>
            </div>
            <div>
              <div className="imgbox">
                <img
                  src="http://static.apiseven.com/team_building__monochromatic.svg"
                  alt=""
                />
              </div>
              <h3>{t("about-item5")}</h3>
              <p>{t("about-item-text5")}</p>
            </div>
          </div>
        </div>
        <div className="boxdesc">
          <h2>{t("about-title4")}</h2>
          <div className="info">
            <div className="col1">
              <div>
                {t("about-office-info1")}
                <span>{t(`footer:footer-text20`)}</span>
              </div>
              <div>
                {t("about-office-info2")}
                <span>{t(`footer:footer-text22`)}</span>
              </div>
              <div>
                {t("about-office-info3")}
                <span>{t("about-office-address3")}</span>
              </div>
            </div>
            <div className="col2">
              <div>
                <p>{t("about-contact-detail1")}</p>
                <a href="mailto:support@api7.ai">
                  <span>support@api7.ai</span>
                </a>
              </div>
              <div>
                <p>{t("about-email-address")}</p>
                <p>
                  <a href="mailto:support@api7.ai">
                    <span>support@api7.ai</span>
                  </a>
                </p>
              </div>
              <div>
                <a href={getRequestDemoLink(language)} target="_blank">
                  <span className="tip">{t("about-contact-detail2")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SWrapper>
  );
};

About.getInitialProps = async (context) => {
  const { lng = "zh-CN" } = (context.req as any) || {};

  const posts = data["about"][lng];

  return {
    namespacesRequired: ["common", "footer"],
    list: posts,
  };
};

export default withTranslation("about")(About as any);
