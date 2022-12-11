import styled from 'styled-components'

export const ReviewListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  border: 1px solid red;
  padding: 20px 0;
`

export const ReviewTop = styled.div`
  display: flex;
  justify-content: space-between;
`

export const NameNCount = styled.div`
  position: relative;
  display: flex;
  width: 180px;
  h1 {
    font-size: 32px;
    font-weight: bold;
  }

  .count {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
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
        width: 14px;
        height: 14px;
      }
    }
  }
`
