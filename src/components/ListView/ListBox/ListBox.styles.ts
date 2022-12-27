import styled from 'styled-components'

export const ListWrapper = styled.div`
  height: calc(100% - 90px);

  .noResult {
    color: ${(props) => props.theme.colors.purple};
    padding: 10px;
    font-weight: 700;
  }

  @media screen and (max-width: 576px) {
    height: calc(100% - 50px);
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

  @media screen and (max-width: 768px) {
    font-size: 12px;
    padding: 2px;

    li {
      padding: 0 3px;
    }
  }

  @media screen and (max-width: 576px) {
    height: 25px;
    justify-content: space-around;
    padding: 0px;

    li {
      :nth-of-type(1) {
        border-right: none;
      }
      :nth-of-type(3) {
        border-left: none;
      }
    }
  }
`
export const ResultBox = styled.ul`
  height: calc(100% - 30px);
  overflow-x: scroll;

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
