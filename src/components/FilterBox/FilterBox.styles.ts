import styled from 'styled-components'

export const FilterWrapper = styled.div`
  height: calc(100% - 90px);
  padding: 20px 10px;
  overflow-y: scroll;

  position: relative;
  display: flex;
  flex-direction: column;

  > div {
    border-bottom: 1px solid ${(props) => props.theme.colors.filterBorder};
    padding-bottom: 20px;
    margin-bottom: 20px;
  }

  .initBtn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 50px;
    font-weight: 700;
    border: none;
    margin-bottom: 20px;
  }
`
export const Title = styled.h2`
  font-weight: 700;
  margin-left: 10px;
  margin-bottom: 10px;
`

export const KeywordGroup = styled.div`
  > div {
    padding: 5px 15px;
    margin-bottom: 5px;

    &:last-of-type {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
`
