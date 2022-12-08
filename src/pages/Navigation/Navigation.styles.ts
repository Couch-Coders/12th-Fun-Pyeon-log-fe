import styled from 'styled-components'

export const NavigationContainer = styled.div`
  background-color: #fff;
  top: 0;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border-bottom: 1px solid #ececec;
`
export const LogoContainer = styled.div`
  svg {
    height: 45px;
  }
`
export const Avatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #ececec;
  background-color: #d9d9d9;
`
export const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 20px;
`
