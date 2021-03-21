import styled from "styled-components";

export const SSection1 = styled.div`
  max-width: 780px;
  transition-property: background-image, border, border-radius, box-shadow;
  transition-duration: .3s, 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease, ease, ease, ease;
  transition-delay: 0s, 0s, 0s, 0s;
  position: relative;
  display: block;
  margin: 0 auto;
`;

export const SBox1 = styled.div`
  padding: 0 1rem;
  margin: 45px 0;
  align-items: center;
  :after {
    content:'';
    min-height:inherit;
    font-size:0;
  }
`;

export const SInner = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  align-content: flex-start; 

  h1 {
    text-align: left;
    color: rgba(41, 41, 41, 1);
    font-family: fell, Georgia, Cambria, "Times New Roman", Times, serif;
    font-size: 48px;
    font-weight: 400;
    line-height: 1.5;
  }

  div {
    min-width: 250px;
    margin-top: 25px;
    display: flex;
  }

  img {
    width: 58px;
    height: 58px;
  }

  span {
    align-self: flex-end;
    color: rgba(117, 117, 117, 1);
    font-size: 14px;
    font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    padding: 0 2%;
  }

  @media (max-width: 1024px) {
    h1 {
      font-size: 46px;
    }

    span {
      padding-top: 5%;
    }
  }

  @media (max-width: 560px) {
    h1 {
      font-size: 38px;
      line-height: 1.4em;
    }

    span {
      font-size: 14px;
      line-height: 1.4em;
    }
  }
`;

export const SSection2 = styled.div`
  max-width: 780px;
  background-color: rgba(255,255,255,.9098039215686274);
  transition-property: background-image, border, border-radius, box-shadow;
  transition-duration: .3s, 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease, ease, ease;
  transition-delay: 0s, 0s, 0s, 0s;
  margin: 0 auto;
  position: relative;
  background-color: transparent;

  @media (min-width: 1200px) {
    width: 1170px;
    padding: 0;
  }
`;

export const SBox2 = styled.div`
  min-height: 591px;
  padding: 0 1rem;

  @media (max-width: 420px) {
    min-height: 480px;
  }
`;

export const SArticle = styled.article`
  font-size: 16px;
  font-family: initial;
  font-weight: 300;
  line-height: 1.618;
  color: #586376;
  word-break: break-all;
  -webkit-font-smoothing: antialiased;

  p {
    margin: 20px 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 400;
    line-height: 30px;
  }

  h3 {
    display: flex;
    margin: 0 0 30px;
    font-weight: 300;
  }

  ol, ul {
    margin-top: 0;
    margin-bottom: 30px;
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0em;
    margin-inline-end: 0em;
    padding-inline-start: 25px;
  }

  p a {
    -webkit-box-shadow: none;
    box-shadow: none;
    text-decoration: none;
    color: #ff2500;

    :hover {
      text-decoration: none;
      opacity: .75;
    }
  }

  table {
    width: 100%;
    display: table;
    margin: 0;
    font-size: 16px;
    border-spacing: 0;
    border-collapse: collapse;
    border-color: grey;
    background-color: transparent !important;
    border-bottom: 1px solid #f3f4f5;
    margin-block-start: 1em;
    margin-block-end: 1em;

    thead {
      font-size: 19px;
      font-weight: 600;
    }

    tbody {
      box-sizing: border-box;
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
      
      tr {
        border-bottom: 1px solid #eee;
        :nth-child(odd) {
          background-color: #f3f4f5;
        }

        td {
          padding: 12px 8px;

          a {
            -webkit-box-shadow: none;
            box-shadow: none;
            text-decoration: none;
            color: #FE0000;
          }
        }
      }
    }
  }

  .iframeBox {
    width: 100%;
    height: 900px
  }

  @media (max-width: 1300px) {
    .iframeBox {
      height: 600px;
    }
  }

  @media (max-width: 560px) {
    h2 {
      font-size: 26px;
    }

    table {
      font-size: 14px;
    }

    .iframeBox {
      padding-top: 30px;
      height: 550px;
    }
  }

  @media (max-width: 420px) {
    ol {
      padding-inline-start: 30px;
    }

    table tbody tr td {
      padding: 6px 4px;
    }

    .iframeBox {
      height: 400px;
    }
  }
`;
