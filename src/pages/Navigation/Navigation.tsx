import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ReactComponent as Funlogo } from '../../assets/fun-pyeon-logo.svg'
import FunButton from '@styles/FunButton'
import {
  NavigationContainer,
  LogoContainer,
  Avatar,
  LogoutContainer,
} from './Navigation.styles'
import LoginModal from '@components/LoginModal/LoginModal'

const Navigation = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <NavigationContainer>
        <LogoContainer>
          <Funlogo
            onClick={() => {
              navigate('/')
            }}
          />
        </LogoContainer>
        {isLogin ? (
          <LogoutContainer>
            <Avatar></Avatar>
            <p>nickname</p>
            <FunButton
              onClick={() => {
                setIsLogin(false)
              }}
            >
              Logout
            </FunButton>
          </LogoutContainer>
        ) : (
          <FunButton
            onClick={() => {
              setIsLogin(true)
              setModalOpen(true)
            }}
          >
            Login
          </FunButton>
        )}
        {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
      </NavigationContainer>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navigation
