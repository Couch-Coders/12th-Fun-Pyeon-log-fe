import styled from 'styled-components'

export const InfoContainer = styled.section`
  display: flex;
  position: relative;
  height: 170px;
  width: 80%;
  min-width: 800px;
  padding: 10px 0;
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
`
export const ConvInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  padding: 0 25px;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: #7d53d6;
  }

  p {
    font-size: 20px;
    display: flex;
    gap: 10px;

    span {
      margin-right: 5px;
    }
  }
`

export const KeywordBox = styled.div`
  ul {
    display: flex;
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
`
