import React, { ButtonHTMLAttributes } from 'react'
import { mapBtn, BaseBtn, GoogleSignInBtn } from './FunButton.styles'

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google',
  map = 'map',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseBtn =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseBtn,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInBtn,
    [BUTTON_TYPE_CLASSES.map]: mapBtn,
  }[buttonType])

type FunButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES
} & ButtonHTMLAttributes<HTMLButtonElement>

const FunButton: React.FC<FunButtonProps> = ({
  buttonType,
  children,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType)
  return <CustomButton {...otherProps}>{children}</CustomButton>
}

export default FunButton
