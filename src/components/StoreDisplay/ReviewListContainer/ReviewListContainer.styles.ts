import styled from 'styled-components'

export const ReviewListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 740px;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 560px;
  }
  @media screen and (max-width: 576px) {
    width: 90%;
    min-width: 320px;
  }
`

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  .button {
    .disabled {
      color: ${(props) => props.theme.colors.checkBoxDesc};
      background-color: ${(props) => props.theme.colors.checkBox};
      border: none;
    }
  }
`

export const NameNCount = styled.div`
  position: relative;
  display: flex;
  width: 160px;
  h1 {
    font-size: 28px;
    font-weight: bold;
    position: absolute;
    bottom: 0;
  }

  .count {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #cfcfcf;
    border-radius: 5px;
    padding: 0 8px;
    position: absolute;
    bottom: 0;
    right: -10px;
    align-items: flex-end;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translate(-2px, -2px);
      svg {
        width: 12px;
        height: 12px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 140px;
    h1 {
      font-size: 24px;
      font-weight: bold;
    }
    .count {
      font-size: 14px;

      span {
        svg {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
`

export const ListContainer = styled.div`
  position: relative;
  height: 450px;
  border: 1px solid #d9d9d9;

  > p {
    margin: 20px;
    color: ${(props) => props.theme.colors.purple};
    font-weight: 700;
  }

  .opposite {
    margin: 10px 0;
    margin-left: calc(50% - 44px);
  }

  overflow-y: scroll;

  // 스크롤바
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: rgba(125, 83, 214, 0.7);

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(125, 83, 214, 0.07);
  }
`
