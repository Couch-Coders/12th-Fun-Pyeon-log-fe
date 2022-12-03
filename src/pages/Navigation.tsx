import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { ReactComponent as Funlogo } from '../assets/fun-pyeon-logo.svg'
import FunButton from '@styles/FunButton'

const NavigationContainer = styled.div`
  background-color: #fff;
  top: 0;
  height: 80px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  border: 1px solid #ececec;
`

const LogoContainer = styled.div``

const Avatar = styled.div`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  border: 1px solid #ececec;
  background-color: #d9d9d9;
`
const LogoutContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: 20px;
`

const Navigation = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)

  return (
    <>
      <NavigationContainer>
        <LogoContainer>
          <Funlogo />
        </LogoContainer>
        {isLogin ? (
          <LogoutContainer>
            <Avatar></Avatar>
            <p>nickname</p>
            <FunButton onClick={() => setIsLogin(false)}>Logout</FunButton>
          </LogoutContainer>
        ) : (
          <FunButton onClick={() => setIsLogin(true)}>Login</FunButton>
        )}
      </NavigationContainer>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navigation
