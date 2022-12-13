import styled from 'styled-components'

interface ListContainerProps {
  isWide: boolean
}

export const ListContainer = styled.div<ListContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid #d9d9d9;

  padding: 25px 10px 10px;

  .review {
    font-size: 16px;
    line-height: 1.2rem;
    margin-bottom: 20px;
    height: ${({ isWide }) => (isWide ? '200px' : '73px')};
    overflow-y: scroll;
    transition: height 0.2s ease;
    cursor: pointer;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`
export const ReviewEditButton = styled.div`
  position: absolute;
  top: 1px;
  right: 8px;
  display: flex;

  :first-child button {
    margin-left: 5px;
  }
  button {
    width: 25px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    font-weight: bold;

    cursor: pointer;

    :active {
      transform: scale(0.95);
    }
    :hover {
      color: #4d4d4d;
    }
  }
`

export const ListInfo = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  font-size: 20px;
  font-weight: 600;

  .star_box {
    width: 100px;
    svg {
      fill: rgba(255, 230, 0, 1);
      margin-right: 4px;
    }
  }
`

export const KeywordBox = styled.div`
  ul {
    display: flex;
    li {
      span {
        background-color: white;
        font-size: 14px;
        color: #7d53d6;
        border: 1px solid #7d53d6;
        border-radius: 5px;
        padding: 2px 5px;
        margin: 0 5px;
        transition: 0.5s;
      }
    }
  }
`

export const ReviewWirter = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  right: 0;
  font-size: 18px;

  .day {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;
  }
`
