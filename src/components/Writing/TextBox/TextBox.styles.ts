import styled from 'styled-components'

export const TextWrapper = styled.div`
  p {
    font-weight: 700;
    margin-bottom: 10px;

    span {
      font-size: 14px;
      font-weight: 500;
      color: ${(props) => props.theme.colors.overlayDesc};
      margin-left: 10px;
    }
  }

  textarea {
    width: 100%;
    min-height: 250px;
    font-size: 15px;
    line-height: 1.4;
    letter-spacing: 1px;
    background-color: ${(props) => props.theme.colors.reviewBg};
    border: none;
    border-radius: 10px;
    resize: none;
    padding: 20px;

    &:focus {
      outline: none;
    }
  }

  @media screen and (max-width: 768px) {
    p {
      span {
        margin-left: 8px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    p {
      font-size: 14px;
      span {
        font-size: 10px;
        margin-left: 5px;
      }
    }
  }
`
