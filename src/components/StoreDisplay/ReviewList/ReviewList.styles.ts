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
  padding: 35px 10px 10px;

  .review {
    padding: 12px 5px 0;
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

  @media screen and (max-width: 768px) {
    padding: 30px 8px 8px;

    .review {
      font-size: 14px;
      line-height: 1.1rem;
      letter-spacing: 0.3px;
      margin-bottom: 16px;
      height: ${({ isWide }) => (isWide ? '150px' : '63px')};
    }
  }
  @media screen and (max-width: 576px) {
    padding: 30px 8px 8px;

    .review {
      font-size: 12px;
      line-height: 1rem;
      letter-spacing: 0.2px;
      margin-bottom: 16px;
      height: ${({ isWide }) => (isWide ? '120px' : '63px')};
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

  @media screen and (max-width: 768px) {
    button {
      width: 22px;
      font-size: 18px;

      &:first-child {
        margin-right: 12px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    top: 3px;

    button {
      width: 15px;
      font-size: 14px;

      &:first-child {
        margin-right: 8px;
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

  @media screen and (max-width: 768px) {
    font-size: 18px;
    .star_box {
      width: 50px;
      svg {
        fill: rgba(255, 230, 0, 1);
        margin-right: 3px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    font-size: 16px;
    .star_box {
      width: 40px;
    }
  }
`

export const KeywordBox = styled.div<ListContainerProps>`
  width: 700px;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-bottom: ${({ isWide }) => (isWide ? '10px' : '0')};
    }
  }

  @media screen and (max-width: 768px) {
    width: 530px;
  }
  @media screen and (max-width: 576px) {
    width: 330px;
    li {
      margin-bottom: ${({ isWide }) => (isWide ? '10px' : '0')};
      span {
        margin: 0 3px;
      }
    }
  }
`

export const ReviewWirter = styled.div`
  display: flex;
  align-items: baseline;
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  padding-bottom: 3px;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(125, 83, 214, 0.5);

  .day {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.filterBrand};
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    .day {
      margin-left: 8px;
      font-size: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 12px;
    .day {
      margin-top: 5px;
      font-size: 10px;
    }
  }
`
