import styled from "styled-components";

export const SWrapper = styled.div`
  iframe {
    width: 100%;
    min-height: 890px;
    border: none;
    margin-top: 40px;
  }

  @media (max-width: 480px) {
    iframe {
      min-height: 920px !important;
    }
  }

  @media (max-width: 350px) {
    iframe {
      min-height: 1000px !important;
    }
  }
`
