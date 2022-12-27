import styled from 'styled-components'

export const Stars = styled.div`
  width: 15%;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-weight: 700;
    margin-bottom: 10px;
  }

  ul {
    padding: 10px;
    background-color: #fff;
    border-radius: 50px;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.15);

    span {
      color: ${(props) => props.theme.colors.checkBox};
      margin: 0 2px;
      svg {
        width: 20px;
        height: 20px;
      }

      &.clicked {
        color: ${(props) => props.theme.colors.star};
      }
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    p {
      margin-bottom: unset;
      margin-right: 10px;
      font-size: 13px;
    }
    ul {
      padding: 8px;

      span {
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    p {
      margin-bottom: unset;
      margin-right: 10px;
      font-size: 13px;
    }
  }
`
