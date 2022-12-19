import React from 'react'
import { TextWrapper } from './TextBox.styles'

interface TextProps {
  reviewContent: string
  setReviewContent: (reviewContent: string) => void
}

const TextBox: React.FC<TextProps> = ({ reviewContent, setReviewContent }) => {
  return (
    <TextWrapper>
      <p>
        리뷰를 남겨주세요
        <span>(500자 이내)</span>
      </p>
      <textarea
        maxLength={500}
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />
    </TextWrapper>
  )
}

export default TextBox
