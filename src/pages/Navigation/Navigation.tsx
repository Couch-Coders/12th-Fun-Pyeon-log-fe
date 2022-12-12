import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginModal from '@components/LoginModal/LoginModal'
import FunButton, { BUTTON_TYPE_CLASSES } from '@styles/FunButton'
import { ReactComponent as Funlogo } from '../../assets/fun-pyeon-logo.svg'
import { NavCon, LogoCon, Avatar, LogoutCon } from './Navigation.styles'

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
              buttonType={BUTTON_TYPE_CLASSES.base}
              name={'Logout'}
              onClick={() => {
                setIsLogin(false)
              }}
            />
          </LogoutCon>
        ) : (
          <FunButton
            buttonType={BUTTON_TYPE_CLASSES.base}
            name={'Login'}
            onClick={() => {
              setIsLogin(true)
              setModalOpen(true)
            }}
          />
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
