import React from 'react'
import FunButton, { BUTTON_TYPE_CLASSES } from '@styles/FunButton'
import { googleSignIn } from '@services/firebaseAuth'
import { LoginWrap, LoginBox, CloseBtn, Content } from './LoginModal.styles'

interface ModalProps {
  setModalOpen: (modalOpen: boolean) => void
}

const LoginModal: React.FC<ModalProps> = ({ setModalOpen }) => {
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
          <FunButton
            buttonType={BUTTON_TYPE_CLASSES.google}
            name={'Google 로그인'}
            onClick={logIn}
          />
        </Content>
      </LoginBox>
    </LoginWrap>
  )
}

export default LoginModal
