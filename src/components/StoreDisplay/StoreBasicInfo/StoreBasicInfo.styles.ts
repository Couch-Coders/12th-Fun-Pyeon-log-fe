import styled from 'styled-components'

export const InfoContainer = styled.section`
  display: flex;
  position: relative;
  height: 170px;
  width: 80%;
  min-width: 800px;
  padding: 10px 0;

  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 550px;
    height: 180px;
  }
  @media screen and (max-width: 576px) {
    width: 90%;
    min-width: 450px;
    height: 180px;
  }
`

export const ConvImgWrapper = styled.div`
  width: 120px;
  height: 120px;
  border: 1.6px solid #cfcfcf;
  border-radius: 15px;
  overflow: hidden;

  img {
    width: 130px;
    height: 130px;
    transform: translate(-5px, -5px);
  }

  @media screen and (max-width: 768px) {
    min-width: 100px;
    height: 100px;
    border-radius: 10px;

    img {
      width: 105px;
      height: 105px;
    }
  }
  @media screen and (max-width: 576px) {
    min-width: 80px;
    width: 80px;
    height: 80px;

    img {
      width: 85px;
      height: 85px;
    }
  }
`
export const ConvInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 0 25px;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #7d53d6;
    margin-bottom: 15px;
  }

  p {
    font-size: 20px;
    display: flex;
    margin-bottom: 15px;
    :first-child {
      margin-left: 10px;
    }

    span {
      margin-right: 5px;
    }
  }

  @media screen and (max-width: 768px) {
    padding: 0 15px;
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 16px;

      :first-child {
        margin-left: 5px;
      }

      span {
        margin-right: 3px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    padding: 0 10px;
    h1 {
      font-size: 1.8rem;
    }
    p {
      font-size: 14px;
    }
  }
`

export const KeywordBox = styled.div`
  ul {
    display: flex;

    @media screen and (max-width: 768px) {
      flex-wrap: wrap;
      li {
        margin-bottom: 12px;
        span {
          font-size: 12px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      li {
        margin-bottom: 10px;
      }
    }
  }
`

export const StarPoint = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  width: 140px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

  text-align: center;

  font-size: 24px;
  font-weight: bold;

  svg {
    fill: rgba(255, 230, 0, 1);
    margin: 0 10px;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 45px;
    border-left: 1px solid #d9d9d9;
  }

  @media screen and (max-width: 768px) {
    width: 90px;
    height: 35px;
    font-size: 16px;

    p {
      width: 80px;
      height: 35px;
      border-left: 1px solid #d9d9d9;
    }
  }
  @media screen and (max-width: 576px) {
    width: 80px;
    height: 30px;
    font-size: 14px;

    p {
      width: 80px;
      height: 30px;
      border-left: 1px solid #d9d9d9;
    }
  }
`
