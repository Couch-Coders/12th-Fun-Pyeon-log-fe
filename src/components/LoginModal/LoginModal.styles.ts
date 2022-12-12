import styled from 'styled-components'

export const LoginWrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginBox = styled.div`
  width: 30vw;
  min-width: 300px;
  max-width: 500px;
  height: 500px;
  background-color: #f2f7f9;
  border: 2px solid #7d53d6;
  border-radius: 10px;
  position: relative;
`

export const CloseBtn = styled.button`
  width: 25px;
  height: 25px;
  color: #7d53d6;
  background-color: transparent;
  border: 1px solid #7d53d6;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
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
    border: 1px solid #111;
    margin-bottom: 20px;
  }
`
