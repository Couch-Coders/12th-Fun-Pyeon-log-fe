import styled from 'styled-components'

export const ListWrapper = styled.div`
  height: calc(100% - 90px);

  .noResult {
    color: ${(props) => props.theme.colors.purple};
    padding: 10px;
    font-weight: 700;
  }
`
export const SortBtns = styled.ul`
  width: 100%;
  height: 30px;
  color: ${(props) => props.theme.colors.sortBtn};
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    padding: 0 5px;
    cursor: pointer;

    :nth-of-type(1) {
      border-right: 1px solid ${(props) => props.theme.colors.border};
    }
    :nth-of-type(3) {
      border-left: 1px solid ${(props) => props.theme.colors.border};
    }

    &.active {
      color: ${(props) => props.theme.colors.purple};
    }
  }
`
export const ResultBox = styled.ul`
  height: calc(100% - 30px);
  overflow-x: scroll;
`
