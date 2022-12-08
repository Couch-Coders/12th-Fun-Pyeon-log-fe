import React, { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

const BaseButton = styled.button`
  width: 5.5rem;
  height: 2rem;

  background-color: #7d53d6;
  border-radius: 5px;
  border: none;

  color: white;
  cursor: pointer;

  :hover {
    background-color: rgba(125, 83, 214, 0.8);
  }
`

const FunButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...otherProps
}) => {
  return <BaseButton {...otherProps}>{children}</BaseButton>
}

export default FunButton
