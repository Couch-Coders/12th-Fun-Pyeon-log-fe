import styled from 'styled-components'

export const InfoContainer = styled.section`
  display: flex;
  position: relative;
  height: 170px;
  width: 80%;
  min-width: 740px;
  padding: 10px 0;

  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 560px;
    height: 200px;
  }
  @media screen and (max-width: 576px) {
    width: 90%;
    min-width: 320px;
    height: 200px;
  }
`

export const ConvImgWrapper = styled.div`
  width: 120px;
  height: 120px;
  border: 1.6px solid #cfcfcf;
  border-radius: 15px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 130px;
    height: 130px;
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
    width: 100%;
    font-size: 2.5rem;
    font-weight: bold;
    color: #7d53d6;
    padding-right: 100px;
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
      font-size: 1.6rem;
      padding-right: 70px;
    }
    p {
      font-size: 14px;

      :first-child {
        margin-left: 5px;
      }

      span {
        margin-right: 3px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    width: calc(100% - 80px);
    padding: 0 10px;
    h1 {
      font-size: 1.2rem;
      padding-right: 0;
    }
    p {
      font-size: 12px;
      flex-direction: column;
      span {
        margin-bottom: 3px;
      }
    }
  }
`

export const KeywordBox = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      margin-bottom: 12px;
    }

    @media screen and (max-width: 768px) {
      li {
        margin-bottom: 10px;
      }
    }
  }

  @media screen and (max-width: 576px) {
  }
`

export const StarPoint = styled.div`
  position: absolute;
  top: 10px;
  right: 0;
  width: 120px;
  height: 45px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

  text-align: center;

  font-size: 21px;
  font-weight: bold;

  svg {
    width: 22px;
    height: 22px;
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
    font-size: 15px;

    svg {
      width: 18px;
      height: 18px;
    }

    p {
      width: 80px;
      height: 35px;
      border-left: 1px solid #d9d9d9;
    }
  }
  @media screen and (max-width: 576px) {
    width: 80px;
    height: 30px;
    font-size: 12px;
    top: 100px;
    left: 0;
    right: unset;
    box-shadow: unset;

    svg {
      width: 16px;
      height: 16px;
    }

    p {
      width: 80px;
      height: 30px;
      border-left: 1px solid #d9d9d9;
    }
  }
`
