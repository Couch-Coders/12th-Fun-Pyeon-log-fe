import React, { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { BackdropStyle, ModalWrapperStyle } from './Modal.styles'

interface BackdropProps {
  onToggleModal?: () => void
}

interface ModalWrapperProps {
  children: React.ReactNode
}

interface ModalProps extends ModalWrapperProps {
  toggleModal?: () => void
}

export const Backdrop: React.FC<BackdropProps> = ({ onToggleModal }) => {
  return <BackdropStyle onClick={onToggleModal}></BackdropStyle>
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children }) => {
  return <ModalWrapperStyle>{children}</ModalWrapperStyle>
}

const Modal: React.FC<ModalProps> = ({ toggleModal, children }) => {
  return (
    <>
      {createPortal(
        <Backdrop onToggleModal={toggleModal} />,
        document.getElementById('backdorp') as HTMLDivElement
      )}
      {createPortal(
        <ModalWrapper>{children}</ModalWrapper>,
        document.getElementById('overlay') as HTMLDivElement
      )}
    </>
  )
}

export default Modal
