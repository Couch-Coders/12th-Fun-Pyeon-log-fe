import React from 'react'
import { googleSignIn } from '@services/firebaseAuth'
import {
  LoginWrap,
  LoginBox,
  CloseBtn,
  Content,
  LoginBtn,
} from './LoginModal.styles'

interface ModalProps {
  setModalOpen: (modalOpen: boolean) => void
}

const LoginModal = ({ setModalOpen }: ModalProps) => {
  const logIn = async () => {
    await googleSignIn()
    setModalOpen(false)
  }

  return (
    <LoginWrap>
      <LoginBox>
        <CloseBtn onClick={() => setModalOpen(false)}>X</CloseBtn>
        <Content>
          <div className="logo">Logo</div>
          <LoginBtn onClick={logIn}>Google 로그인</LoginBtn>
        </Content>
      </LoginBox>
    </LoginWrap>
  )
}

export default LoginModal
