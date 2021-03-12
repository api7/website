import React from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FooterLinks from "@/components/FooterLinks";

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";

type Props = {
  t: TFunction;
  url: string
};

const getParameterByName = (name, url = '') => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const Contributor: NextPage<Props, any> = ({ t, url }) => {
  const repo = getParameterByName('repo', url);

  return (
    <SWrapper>
      <NextSeo title={t(`common:contributor-graph`)} />
      <Nav />
      <div className="iframeBox">
        <iframe src={"https://contributor-graph.apiseven.com/?repo=" + repo }></iframe>
      </div>
      <FooterLinks />
      <Footer />
    </SWrapper>
  );
};

Contributor.getInitialProps = async (ctx) => {
  return { url: ctx.req.url };
};

export default withTranslation("contributor")(Contributor as any);
