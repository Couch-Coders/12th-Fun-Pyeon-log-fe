import styled from 'styled-components'

interface ListContainerProps {
  isWide: boolean
}

export const ListContainer = styled.div<ListContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  padding: 28px 10px 10px;

  .review {
    font-size: 16px;
    line-height: 1.3rem;
    letter-spacing: 0.5px;
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

  button {
    width: 25px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    font-weight: bold;

    &:first-child {
      margin-right: 15px;
    }

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    span {
      border: 1px solid ${(props) => props.theme.colors.checkBox};
      color: ${(props) => props.theme.colors.checkBoxDesc};
      border-radius: 5px;

      svg {
        margin: 5px;
      }
    }

    :active {
      transform: scale(0.95);
    }
    :hover {
      span {
        color: ${(props) => props.theme.colors.purple};
      }
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
