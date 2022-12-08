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
  return (
    <LoginWrap>
      <LoginBox>
        <CloseBtn onClick={() => setModalOpen(false)}>X</CloseBtn>
        <Content>
          <div className="logo">Logo</div>
          <LoginBtn>Google 로그인</LoginBtn>
        </Content>
      </LoginBox>
    </LoginWrap>
  )
}

export default LoginModal
