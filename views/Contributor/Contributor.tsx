import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fab, Action } from "react-tiny-fab";
import copy from "copy-to-clipboard";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkIcon from "@material-ui/icons/Link";
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

import { withTranslation } from "../../i18n";
import { SWrapper } from "./style";

import "react-tiny-fab/dist/styles.css";

type Props = {
  t: TFunction;
  url: string
};

const getParameterByName = (name, url = '') => {
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const Contributor: NextPage<Props, any> = ({ t, url }) => {
  const repo = getParameterByName('repo', url) || 'apache/apisix';
  const chart = getParameterByName('chart', url);
  const merge = getParameterByName('merge', url) || '';
  const [legend, setLegend] = useState([]);
  const [chartType, setChartType] = useState('');
  const [shareUrl, setShareUrl] = useState('https://www.apiseven.com/en/contributor-graph')

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if (event.data.chartType) {
        setChartType(event.data.chartType)
      }
      if (event.data.legend) {
        setLegend(event.data.legend);
      }
      if (event.data.share) {
        if (event.data.share.to === 'twitter') {
          window.location.href = `https://twitter.com/share?text=Amazing tools to view your repo contributor over time!&url=${event.data.share.url}`
          return;
        }
      }
    });
  }, []);

  useEffect(() => {
    const url = `${window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname}/?chart=${chartType}&repo=${legend.join(",")}`
    setShareUrl(url);
    window.history.pushState(null, null, `?chart=${chartType}&repo=${legend.join(",")}`);
  }, [chartType, legend])

  return (
    <SWrapper>
      <NextSeo title={t(`common:contributor-graph`)} />
      <div className="iframeBox">
        <iframe src={`https://contributor-graph.apiseven.com/?chart=${chart}&repo=${repo}${merge ? '&merge=true' : ''}`} scrolling="no" style={{ overflow: "hidden", height: chartType === 'contributorMonthlyActivity' ? '1000px' : '1200px' }}></iframe>
      </div>
    </SWrapper>
  );
};

Contributor.getInitialProps = async (ctx) => {
  return { url: ctx.req.url };
};

export default withTranslation("contributor")(Contributor as any);
