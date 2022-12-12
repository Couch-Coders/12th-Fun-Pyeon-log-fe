import React from 'react'
import FunButton, { BUTTON_TYPE_CLASSES } from '@styles/FunButton'
import { LoginWrap, LoginBox, CloseBtn, Content } from './LoginModal.styles'

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginModal: React.FC<ModalProps> = ({ setModalOpen }) => {
  return (
    <LoginWrap>
      <LoginBox>
        <CloseBtn onClick={() => setModalOpen(false)}>X</CloseBtn>
        <Content>
          <div className="logo">Logo</div>
          <FunButton
            buttonType={BUTTON_TYPE_CLASSES.google}
            name={'Google 로그인'}
          />
        </Content>
      </LoginBox>
    </LoginWrap>
  )
}

export default LoginModal
