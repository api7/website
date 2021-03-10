import { createGlobalStyle, DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  color: {
    primary: "#fe0000",
  },
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
  }

  article {
    img {
      width: 100%;
    }
  }
`

export default theme
