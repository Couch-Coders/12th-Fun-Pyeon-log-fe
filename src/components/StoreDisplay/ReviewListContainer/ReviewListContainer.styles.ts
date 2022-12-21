import styled from 'styled-components'

export const ReviewListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 800px;
  padding: 20px 0;
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
    right: 0;
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
    /* border: 1px solid transparent; */
    margin: 10px 0;
    margin-left: calc(50% - 44px);
  }

  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`
