import React from 'react'
import Modal from '@components/Modal/Modal'
import FunButton, { BUTTON_TYPE_CLASSES } from '@components/styles/FunButton'
import { googleSignIn } from '@services/firebaseAuth'
import { ReactComponent as Funbadge } from '../../assets/funlog-badge.svg'
import { LoginBox, CloseBtn, Content } from './LoginModal.styles'

interface ModalProps {
  setModalOpen: (modalOpen: boolean) => void
}

const LoginModal: React.FC<ModalProps> = ({ setModalOpen }) => {
  const logIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
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
          <FunButton buttonType={BUTTON_TYPE_CLASSES.google} onClick={logIn}>
            Google 로그인
          </FunButton>
        </Content>
      </LoginBox>
    </Modal>
  )
}

export default LoginModal
