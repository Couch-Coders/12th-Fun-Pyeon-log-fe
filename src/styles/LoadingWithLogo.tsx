import React from 'react'
import Modal from '@components/modal/Modal'
import { LoadingContainer } from './LoadingWithLogo.styles'
import { ReactComponent as Funbadge } from '../assets/funlog-badge.svg'
import Spinner from './Spinner'

const LoadingWithLogo = () => {
  return (
    <Modal>
      <LoadingContainer>
        <div className="logo">
          <Funbadge />
        </div>
        <Spinner />
      </LoadingContainer>
    </Modal>
  )
}

export default LoadingWithLogo
