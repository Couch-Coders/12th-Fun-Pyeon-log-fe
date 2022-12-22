import styled from 'styled-components'

export const LoginBox = styled.div`
  width: 350px;

  height: 400px;
  background-color: #f2f7f9;
  border: 2px solid #7d53d6;
  border-radius: 10px;
  position: relative;
`

export const CloseBtn = styled.button`
  width: 30px;
  height: 30px;
  color: #7d53d6;
  font-weight: bold;
  background-color: transparent;
  border: 1px solid #7d53d6;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: all 0.4s ease;

  :hover {
    color: white;
    background-color: ${(props) => props.theme.colors.purple};
  }
`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    width: 200px;
    height: 200px;
    margin-bottom: 30px;

    svg {
      fill: black;
    }
  }
`
