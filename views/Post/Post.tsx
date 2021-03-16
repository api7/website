import React, { useEffect } from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { TFunction } from "next-i18next";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import gfm from "remark-gfm";

import { withTranslation } from "../../i18n";
import {
  SSection1,
  SSection2,
  SBackground,
  SBox1,
  SBox2,
  SInner,
  SArticle,
} from "./style";

type Props = {
  t: TFunction;
  isSimple?: boolean;
  content: string;
  data: {
    title: string;
    date: Date;
  };
};

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter showLineNumbers={true} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

const Page: NextPage<Props, any> = ({ t, content, data = {}, isSimple }) => {
  useEffect(() => {
    if (!/(usercase|blog)/.test(window.location.pathname)) {
      return;
    }

    (window as any).disqus_config = function () {
      this.page.url = window.location.href;
      this.page.identifier = window.location.href.split("/").pop();
    };

    (function () {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement("script");
      s.src = "https://apiseven.disqus.com/embed.js";
      s.setAttribute("data-timestamp", `${+new Date()}`);
      (d.head || d.body).appendChild(s);
    })();
  }, []);

  if (isSimple) {
    return (
      <SBox2 style={{ maxWidth: 1200, padding: "0 25px" }}>
        <h2 style={{ textAlign: "center", marginTop: 30, marginBottom: 20 }}>
          {data.title}
        </h2>
        <SArticle>
          <ReactMarkdown
            escapeHtml={false}
            source={content}
            plugins={[gfm]}
            renderers={{ code: CodeBlock }}
          />
        </SArticle>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ marginBottom: 0 }}>
            <b>SUPPORTED BY</b>
          </p>
          <a href="https://www.apiseven.com/" target="_blank">
            <img
              style={{ width: 100 }}
              src="https://static.apiseven.com/2020/05/Jietu20200312-103300-removebg-preview.png"
              alt=""
            />
          </a>
        </div>
      </SBox2>
    );
  }

  return (
    <>
      <NextSeo
        title={data.title || t("common:job")}
        description={(content || "").trim().substring(0, 140)}
      />
      <Head>
        <script
          type="text/javascript"
          src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5fd9eee22eecfc00"
        ></script>
      </Head>
      <div>
        {content === undefined && <h2>{t("common:notFound")}</h2>}
        {content !== undefined && (
          <div>
            <SSection1>
              <SBackground></SBackground>
              <SBox1>
                <SInner>
                  <h1>{data.title}</h1>
                  <span>
                    {t("common:updatedAt")}&nbsp;
                      {new Date(data.date).toLocaleDateString()}
                  </span>
                </SInner>
              </SBox1>
            </SSection1>
            <SSection2>
              <SBox2>
                <SArticle>
                  <ReactMarkdown
                    escapeHtml={false}
                    source={content}
                    plugins={[gfm]}
                    renderers={{ code: CodeBlock }}
                  />
                </SArticle>
                <div id="disqus_thread"></div>
              </SBox2>
            </SSection2>
          </div>
        )}
      </div>
    </>
  );
};

Page.getInitialProps = async (context) => {
  // https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
  const { slug = [] } = context.query;

  const { lng = "zh-CN" } = (context.req as any) || {};

  try {
    let fileData = null;

    if (slug.length === 1) {
      fileData = await import(`../../_posts/page/${lng}/${slug[0]}.md`);
    }

    if (slug.length === 2) {
      fileData = await import(`../../_posts/${slug[0]}/${lng}/${slug[1]}.md`);
    }

    const { data, content } = matter(fileData.default);
    return {
      namespacesRequired: ["common"],
      data,
      content,
      isSimple: ["luarocks"].includes(slug[0]),
    };
  } catch (error) {
    return {
      namespacesRequired: ["common"],
      content: undefined,
    };
  }
};

// TODO: typing
export default withTranslation("post")(Page as any);
