import styled from 'styled-components'

export const InfoContainer = styled.div`
  display: flex;
  position: relative;
  height: 170px;
  width: 80%;
  min-width: 1000px;
`

export const ConvImgWrapper = styled.div`
  width: 140px;
  height: 140px;
  border: 1.6px solid #cfcfcf;
  border-radius: 15px;
  overflow: hidden;

  img {
    width: 150px;
    height: 150px;
    transform: translate(-5px, -5px);
  }
`
export const ConvInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 0 25px;

  h1 {
    font-size: 4rem;
    font-weight: bold;
    color: #7d53d6;
  }

  p {
    font-size: 28px;
    display: flex;
    gap: 10px;

    span {
      margin-right: 5px;
    }
  }
`

export const KeywordBox = styled.div`
  display: flex;

  ul {
    display: flex;
    gap: 10px;
    li {
      span {
        background-color: white;
        font-size: 14px;
        color: #7d53d6;
        border: 1px solid #7d53d6;
        border-radius: 5px;
        padding: 2px 5px;
        transition: 0.5s;
      }
    }
  }
`

export const StarPoint = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 170px;
  height: 55px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #d9d9d9;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);

  text-align: center;

  font-size: 30px;
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
    height: 55px;
    border-left: 1px solid #d9d9d9;
  }
`