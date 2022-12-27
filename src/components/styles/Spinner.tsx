import React from 'react'
import styled from 'styled-components'

export const SpinnerOverlay = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const SpinnerContainer = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid #fff;
  border-radius: 50%;
  border-top-color: #7d53d6;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @media screen and (max-width: 576px) {
    width: 30px;
    height: 30px;
  }
`

const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer className="spinner" />
    </SpinnerOverlay>
  )
}

export default Spinner
