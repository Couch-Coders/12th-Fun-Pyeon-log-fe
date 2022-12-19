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
    background-color: ${(props) => props.theme.colors.reviewBg};
    border: none;
    border-radius: 10px;
    resize: none;
    padding: 20px;

    &:focus {
      outline: none;
    }
  }
`
