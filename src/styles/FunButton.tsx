import React, { ButtonHTMLAttributes } from 'react'
import { BaseBtn, GoogleSignInBtn } from './FunButton.styles'

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseBtn =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseBtn,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInBtn,
  }[buttonType])

type FunButtonProps = {
  name: string
  buttonType?: BUTTON_TYPE_CLASSES
} & ButtonHTMLAttributes<HTMLButtonElement>

const FunButton: React.FC<FunButtonProps> = ({
  buttonType,
  name,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType)
  return <CustomButton {...otherProps}>{name}</CustomButton>
}

export default FunButton
