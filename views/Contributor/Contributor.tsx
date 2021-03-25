import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { TFunction } from "next-i18next";
import { NextSeo } from "next-seo";
import { Fab, Action } from "react-tiny-fab";
import copy from "copy-to-clipboard";
import ShareIcon from "@material-ui/icons/Share";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkIcon from "@material-ui/icons/Link";

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
  const repo = getParameterByName('repo', url);
  const [legend, setLegend] = useState([]);

  useEffect(() => {
    window.addEventListener('message', function (event) {
      setLegend(event.data);
    })
  }, []);

  return (
    <SWrapper>
      <Fab
        event="click"
        mainButtonStyles={{ background: "#1DB954" }}
        alwaysShowTitle={true}
        icon={<ShareIcon />}
      >
        <Action
          text="Share on Twitter"
          style={{ backgroundColor: "rgb(29, 161, 242)" }}
          onClick={() => {
            window.location.href = `https://twitter.com/share?text=Amazing tools to view your repo contributor over time!&url=https://www.apiseven.com/en/contributor-graph?repo=${legend.join(
              ","
            )}`;
          }}
        >
          <TwitterIcon />
        </Action>
        <Action
          text="Copy share link"
          style={{ backgroundColor: "#1769FF" }}
          onClick={() => {
            const text = `${window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname}?repo=${legend.join(
                ","
              )}`

            copy(text);
          }}
        >
          <LinkIcon />
        </Action>
      </Fab>
      <NextSeo title={t(`common:contributor-graph`)} />
      <div className="iframeBox">
        <iframe src={"https://contributor-graph.apiseven.com/?repo=" + repo}></iframe>
      </div>
    </SWrapper>
  );
};

Contributor.getInitialProps = async (ctx) => {
  return { url: ctx.req.url };
};

export default withTranslation("contributor")(Contributor as any);
