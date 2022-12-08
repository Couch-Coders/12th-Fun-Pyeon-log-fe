import { googleSignIn } from '@services/firebaseAuth'
import React from 'react'
import {
  LoginWrap,
  LoginBox,
  CloseBtn,
  Content,
  LoginBtn,
} from './LoginModal.styles'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
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
