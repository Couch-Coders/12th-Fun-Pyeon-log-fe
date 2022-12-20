import React from 'react'
import { KeywordWrapper } from './KeywordBadge.styles'
interface KeywordProps {
  children: React.ReactNode
}

const KeywordBadge: React.FC<KeywordProps> = ({ children }) => {
  return (
    <KeywordWrapper>
      <span>{children}</span>
    </KeywordWrapper>
  )
}

export default KeywordBadge
