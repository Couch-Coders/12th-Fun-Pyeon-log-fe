import styled from 'styled-components'

export const WritingBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  /* min-width: 1000px; */
  padding: 20px 0;

  > div {
    margin-bottom: 30px;
  }
`
export const KeyBox = styled.div`
  width: 100%;
  height: 250px;
  background-color: ${(props) => props.theme.colors.reviewkeywordBg};
  border-radius: 10px;
  padding: 20px;

  display: flex;
  align-items: center;
`
export const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-left: 10px;
  }
`
export const Keywords = styled.div`
  width: 80%;

  > div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`
