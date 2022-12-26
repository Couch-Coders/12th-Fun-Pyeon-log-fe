import React from 'react'
import Modal from '@components/Modal/Modal'
import Spinner from './Spinner'
import { ReactComponent as Funbadge } from '../../assets/funlog-badge.svg'
import { LoadingContainer } from './LoadingWithLogo.styles'

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
