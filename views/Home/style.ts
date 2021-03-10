import styled from "styled-components";

export const SSection = styled.div`
  background: var(--chakra-colors-gray-50);
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Montserrat;
  color: #3c4858;
  box-sizing: border-box;
  padding: 0 10px;
  span {
    display: block;
  }
  .block-2-img {
    width: 100%;
    margin: 35px 0;
  }
  .title {
    font-size: 28px;
    font-weight: bold;
  }
  .desc {
    font-size: 18px;
    margin-top: 15px;
    text-align: justify;
  }
  .feature-list {
    display: grid;
    display: -ms-grid;
    grid-template-columns: 1fr;
    -ms-grid-columns: (1fr)[1];
    div:nth-child(1) {
      -ms-grid-column: 1;
      -ms-grid-row: 1;
    }
    div:nth-child(2) {
      -ms-grid-column: 1;
      -ms-grid-row: 2;
    }
    div:nth-child(3) {
      -ms-grid-column: 1;
      -ms-grid-row: 3;
    }
  }
  .feature-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 26px;
      font-weight: bold;
    }
    .desc {
      max-width: 360px;
      word-wrap: break-word;
      margin-top: -10px;
      margin-bottom: 15px;
      font-size: 18px;
    }
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }

  .showcases {
    display: grid;
    display: -ms-grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 80px);
    -ms-grid-columns: (1fr)[2];
    -ms-grid-rows: (80px)[5];
    grid-row-gap: 20px;
    margin-top: 30px;
    div {
      display: flex;
      justify-content: center;
      img {
        width: 228px;
        object-fit: contain;
      }
    }
    div:nth-child(1) {
      -ms-grid-column: 1;
      -ms-grid-row: 1;
    }
    div:nth-child(2) {
      -ms-grid-column: 2;
      -ms-grid-row: 1;
    }
    div:nth-child(3) {
      -ms-grid-column: 1;
      -ms-grid-row: 2;
    }
    div:nth-child(4) {
      -ms-grid-column: 2;
      -ms-grid-row: 2;
    }
    div:nth-child(5) {
      -ms-grid-column: 1;
      -ms-grid-row: 3;
    }
    div:nth-child(6) {
      -ms-grid-column: 2;
      -ms-grid-row: 3;
    }
    div:nth-child(7) {
      -ms-grid-column: 1;
      -ms-grid-row: 4;
    }
    div:nth-child(8) {
      -ms-grid-column: 2;
      -ms-grid-row: 4;
    }
    div:nth-child(9) {
      -ms-grid-column: 1;
      -ms-grid-row: 5;
    }
    div:nth-child(10) {
      -ms-grid-column: 2;
      -ms-grid-row: 5;
    }
  }

  .cert-list {
    display: flex;
    flex-direction: column;
    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 15px 0;
    }
    img {
      max-height: 130px;
    }
  }

  @media (min-width: 1200px) {
    width: 1140px;
    padding: 0;
    margin-bottom: 120px;

    .title {
      font-size: 60px;
    }

    .desc {
      font-size: 25px;
      margin-top: 15px;
    }

    .block-2-img {
      width: auto;
      height: 600px;
      margin: 60px 0;
    }

    .feature-list {
      grid-template-columns: repeat(3, 1fr);
      -ms-grid-columns: (1fr)[3];
      grid-gap: 30px;
      div:nth-child(1) {
        -ms-grid-column: 1;
        -ms-grid-row: 1;
      }
      div:nth-child(2) {
        -ms-grid-column: 2;
        -ms-grid-row: 1;
        .desc {
          padding: 0 20px;
        }
      }
      div:nth-child(3) {
        -ms-grid-column: 3;
        -ms-grid-row: 1;
      }
    }

    .feature-item {
      .title {
        font-size: 29px;
      }
      .desc {
        margin-top: -10px;
        margin-bottom: 15px;
        font-size: 18px;
      }
      &:not(:last-child) {
        margin-bottom: 0;
      }
    }

    .showcases {
      margin-top: 60px;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(2, 80px);
      grid-row-gap: 120px;
      display: -ms-grid;
      -ms-grid-columns: (1fr)[5];
      -ms-grid-rows: (80px)[2];
      div:nth-child(1) {
        -ms-grid-column: 1;
        -ms-grid-row: 1;
      }
      div:nth-child(2) {
        -ms-grid-column: 2;
        -ms-grid-row: 1;
      }
      div:nth-child(3) {
        -ms-grid-column: 3;
        -ms-grid-row: 1;
      }
      div:nth-child(4) {
        -ms-grid-column: 4;
        -ms-grid-row: 1;
      }
      div:nth-child(5) {
        -ms-grid-column: 5;
        -ms-grid-row: 1;
      }
      div:nth-child(6) {
        -ms-grid-column: 1;
        -ms-grid-row: 2;
      }
      div:nth-child(7) {
        -ms-grid-column: 2;
        -ms-grid-row: 2;
      }
      div:nth-child(8) {
        -ms-grid-column: 3;
        -ms-grid-row: 2;
      }
      div:nth-child(9) {
        -ms-grid-column: 4;
        -ms-grid-row: 2;
      }
      div:nth-child(10) {
        -ms-grid-column: 5;
        -ms-grid-row: 2;
      }
    }

    .cert-list {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 60px;
      width: 100%;
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      span {
        margin-top: 10px;
      }
      img {
        height: 100px;
      }
    }
  }
`;
