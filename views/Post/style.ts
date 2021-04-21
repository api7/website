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

  h1 {
    text-align: left;
    color: rgba(41, 41, 41, 1);
    font-family: Segoe UI;
    font-size: 48px;
    font-weight: 600;
    line-height: 60px;
  }

  @media (max-width: 560px) {
    h1 {
      font-size: 38px;
      line-height: 1.4em;
    }
  }
`;

export const SInner = styled.div`
  display: flex;
  margin-top: 25px;


  a {
    box-shadow: none;
    text-decoration: none;
    color: var(--chakra-colors-blue-500);
    font-weight: 300;

    :hover {
      text-decoration: underline;
      color: var(--chakra-colors-blue-600);
    }
  }

  img {
    width: 58px;
    height: 58px;
    border-radius: 50%;
  }

  p {
    min-width: 200px;
    color: rgba(117, 117, 117, 1);
    font-size: 14px;
    font-family: sohne, "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    padding: 0 3%;
  }

  .left {
    width: 30%;
    display: flex;

    div {
      align-self: flex-end;
    }
  }

  .right {
    width: 70%;
    align-self: flex-end;

    svg {
      width: 29px;
      height: 29px;
    }
    
    ul {
      float: right;
      list-style-type: none;
      display: flex;
      font-size: 14px;
      padding: 0 3%;

      li {
        padding-right: 6px;
      }
    }
  }

  @media (max-width: 1024px) {
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
`;

export const SBox2 = styled.div`
  padding: 0 1rem 1rem;
`;

export const SArticle = styled.article`
  font-size: 16px;
  font-family: revert;
  font-weight: 400;
  line-height: 1.618;
  word-break: break-word;
  color: #292929;
  
  p {
    margin: 20px 0;
  }

  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 30px;
  }

  h3 {
    display: flex;
    margin: 0 0 30px;
    font-weight: 400;
  }

  ol, ul {
    margin-top: 0;
    margin-bottom: 30px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0em;
    margin-inline-end: 0em;
    padding-inline-start: 25px;
  }

  a {
    box-shadow: none;
    text-decoration: none;
    color: var(--chakra-colors-blue-500);

    :hover {
      text-decoration: underline;
      color: var(--chakra-colors-blue-600);
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
    height: 600px;
    padding-bottom: 2em;
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
