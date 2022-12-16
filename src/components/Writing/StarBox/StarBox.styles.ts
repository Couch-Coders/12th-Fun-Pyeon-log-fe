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
`
