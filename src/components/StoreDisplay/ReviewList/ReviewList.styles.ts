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

  padding: 28px 10px 10px;

  .review {
    font-size: 16px;
    line-height: 1.2rem;
    margin-bottom: 20px;
    height: ${({ isWide }) => (isWide ? '200px' : '73px')};
    overflow-y: scroll;
    transition: height 0.2s ease;
    white-space: pre-wrap;
    cursor: pointer;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`
export const ReviewEditButton = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
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

export const KeywordBox = styled.div<ListContainerProps>`
  width: 600px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-bottom: ${({ isWide }) => (isWide ? '10px' : '0')};
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
