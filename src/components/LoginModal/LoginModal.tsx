import React from 'react'
import FunButton, { BUTTON_TYPE_CLASSES } from '@styles/FunButton'
import { googleSignIn } from '@services/firebaseAuth'
import { LoginBox, CloseBtn, Content } from './LoginModal.styles'
import { ReactComponent as Funbadge } from '../../assets/funlog-badge.svg'
import Modal from '@components/modal/Modal'

interface ModalProps {
  setModalOpen: (modalOpen: boolean) => void
}

const LoginModal: React.FC<ModalProps> = ({ setModalOpen }) => {
  const logIn = async () => {
    await googleSignIn()
    setModalOpen(false)
  }

  return (
    <Modal toggleModal={() => setModalOpen(false)}>
      <LoginBox>
        <CloseBtn onClick={() => setModalOpen(false)}>X</CloseBtn>
        <Content>
          <div className="logo">
            <Funbadge />
          </div>
          <FunButton
            buttonType={BUTTON_TYPE_CLASSES.google}
            name={'Google 로그인'}
            onClick={logIn}
          />
        </Content>
      </LoginBox>
    </Modal>
  )
}

export default LoginModal
