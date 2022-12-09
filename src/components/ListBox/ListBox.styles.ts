import styled from 'styled-components'

export const ListWrapper = styled.div`
  height: calc(100% - 90px);

  p {
    color: #7d53d6;
    padding: 10px;
  }
`
export const SortBtns = styled.ul`
  width: 100%;
  height: 30px;
  color: #969696;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #d9d9d9;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  li {
    padding: 0 5px;
    cursor: pointer;

    :nth-of-type(1) {
      border-right: 1px solid #d9d9d9;
    }
    :nth-of-type(3) {
      border-left: 1px solid #d9d9d9;
    }

    &.active {
      color: #7d53d6;
    }
  }
`
export const ResultBox = styled.ul`
  height: calc(100% - 30px);
  overflow-x: scroll;
`
