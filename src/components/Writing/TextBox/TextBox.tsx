import React from 'react'
import { TextWrapper } from './TextBox.styles'

interface TextProps {
  setReviewContent: (reviewContent: string) => void
}

const TextBox: React.FC<TextProps> = ({ setReviewContent }) => {
  return (
    <TextWrapper>
      <p>
        리뷰를 남겨주세요
        <span>(500자 이내)</span>
      </p>
      <textarea
        maxLength={500}
        onChange={(e) => setReviewContent(e.target.value)}
      />
    </TextWrapper>
  )
}

export default TextBox
