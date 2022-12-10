import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { ReactComponent as Funlogo } from '../../assets/fun-pyeon-logo.svg'
import FunButton from '@styles/FunButton'
import { NavCon, LogoCon, Avatar, LogoutCon } from './Navigation.styles'
import LoginModal from '@components/LoginModal/LoginModal'

const Navigation = () => {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <NavCon>
        <LogoCon>
          <Funlogo
            onClick={() => {
              navigate('/')
            }}
          />
        </LogoCon>
        {isLogin ? (
          <LogoutCon>
            <Avatar>
              <img
                src="https://lh3.googleusercontent.com/a/AEdFTp4oKPFW_6nqYPabxkYl1wZ8zvdbYIvb7Ndo7nJh=s96-c"
                alt=""
              />
            </Avatar>
            <p>nickname</p>
            <FunButton
              onClick={() => {
                setIsLogin(false)
              }}
            >
              Logout
            </FunButton>
          </LogoutCon>
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
      </NavCon>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Navigation
