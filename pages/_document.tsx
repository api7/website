import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { lngFromReq } from "next-i18next/dist/commonjs/utils";
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      const lng = lngFromReq(ctx.req);
      return {
        ...initialProps,
        lng,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { lng = "zh-CN" } = this.props as any;
    return (
      <html lang={lng}>
        <Head>
        <meta name="keywords" content="APISIX, API7, APISEVEN, API Gateway, Cloud Native, Open Source" />
          <link
            href="https://static.apiseven.com/bootstrap.min.css"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-176821176-1"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-176821176-1');
`,
            }}
          ></script>
          <script dangerouslySetInnerHTML={{
              __html:`(function(w,d,s,r,k,h,m){
                if(w.performance && w.performance.timing && w.performance.navigation) {
                  w[r] = w[r] || function(){(w[r].q = w[r].q || []).push(arguments)};
                  h=d.createElement('script');h.async=true;h.setAttribute('src',s+k);
                  d.getElementsByTagName('head')[0].appendChild(h);
                  (m = window.onerror),(window.onerror = function (b, c, d, f, g) {
                  m && m(b, c, d, f, g),g || (g = new Error(b)),(w[r].q = w[r].q || []).push(["captureException",g]);})
                }
              })(window,document,'//static.site24x7rum.cn/rum/resources/beacon/site24x7rum-min.js?appKey=','s247r','ad4761c24ff5c864bfef36bc11b8b103');`
          }}>
          </script>
          <NextScript />
        </body>
      </html>
    );
  }
}

