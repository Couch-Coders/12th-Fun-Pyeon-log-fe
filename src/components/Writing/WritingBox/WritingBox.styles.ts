import styled from 'styled-components'

export const WritingBoxWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 740px;
  padding: 20px 0;

  > div {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 560px;
  }
  @media screen and (max-width: 576px) {
    width: 90%;
    min-width: 320px;
  }
`
export const KeyBox = styled.div`
  width: 100%;
  min-height: 250px;
  background-color: ${(props) => props.theme.colors.reviewkeywordBg};
  border-radius: 10px;
  padding: 20px;

  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 10px;
  }
`
export const Keywords = styled.div`
  width: 85%;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;

    > div {
      flex-direction: column;
      align-items: center;

      &.keyword {
        p {
          text-align: center;
          font-weight: 700;
          width: 100%;
          margin-bottom: 10px;
          margin-right: 0;
        }
        ul {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          border-left: unset;
          padding-left: 0;
          width: 160px;
          li {
            margin: 3px 0;
            text-align: center;
          }
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    flex-direction: column;
    justify-content: center;

    > div {
      &.keyword {
        p {
          text-align: center;
          font-weight: 700;
          width: 100%;
          margin-bottom: 10px;
          margin-right: 0;
        }
        ul {
          width: 200px;
        }
      }
    }
  }
`
