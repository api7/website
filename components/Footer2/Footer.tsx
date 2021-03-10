import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faYoutube,
  faGithub,
  faWeixin,
} from "@fortawesome/free-brands-svg-icons";
import { NextPage } from "next";
import { TFunction } from "next-i18next";

import { withTranslation } from "../../i18n";
import { SWrapper, SContainer, STextWrapper, SIconList, SIcon } from "./style";

type Props = {
  t: TFunction;
};

const Footer: NextPage<Props, any> = ({ t }) => {
  useEffect(() => {
    eval(`(function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:2173611,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`);
  }, []);

  const icons = [
    {
      title: "Twitter",
      icon: faTwitter,
      href: "https://twitter.com/ApacheAPISIX",
      color: "#00b3ff",
    },
    {
      title: "YouTube",
      icon: faYoutube,
      href: "https://www.youtube.com/channel/UCgPD18cMhOg5rmPVnQhAC8g",
      color: "#f40404",
    },
    {
      title: "WeChat",
      icon: faWeixin,
      href: "https://mp.weixin.qq.com/s/c51apneVj0O9yxiZAHF34Q",
      color: "#23a455",
    },
    {
      title: "GitHub",
      icon: faGithub,
      href: "https://github.com/apache/apisix",
      color: "#000000",
    },
  ];
  return (
    <SWrapper>
      <SContainer>
        {t("")}
        <STextWrapper>
          <div>
            {t("footer-text1")}
            <a
              href="https://beian.miit.gov.cn/#/Integrated/index"
              target="_blank"
            >
              {t("footer-text2")}
            </a>
          </div>
          <div>
            {t("footer-text3")}
            <a href="http://www.apache.org/" target="_blank">
              {t("footer-text4")}
            </a>
            {t("footer-text7")}
            <a
              href="http://www.apache.org/index.html#projects-list"
              target="_blank"
            >
              {t("footer-text5")}
            </a>
            {t("footer-text6")}
          </div>
        </STextWrapper>

        <SIconList>
          {icons.map((item) => (
            <SIcon key={item.title} href={item.href} target="_blank">
              <FontAwesomeIcon icon={item.icon} color={item.color} />
            </SIcon>
          ))}
        </SIconList>
      </SContainer>
    </SWrapper>
  );
};

Footer.getInitialProps = async () => ({
  namespacesRequired: ["footer"],
});

export default withTranslation("footer")(Footer);
