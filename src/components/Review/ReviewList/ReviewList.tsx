import React, { useState } from 'react'
import { StarFilled } from '@ant-design/icons'
import {
  ListContainer,
  ListInfo,
  KeywordBox,
  ReviewWirter,
} from './ReviewList.styles'

interface ReviewType {
  reviewContent: string
  createdDate: number
  starCount: number
  keywords: string[]
}

interface ReviewListProps {
  review: ReviewType
}

const ReviewList: React.FC<ReviewListProps> = ({ review }) => {
  const [isWideView, setIsWideView] = useState<boolean>(false)

  const onWideViewHandler = () => {
    setIsWideView(!isWideView)
  }
  console.log(review.keywords)

  return (
    <ListContainer onClick={onWideViewHandler} isWide={isWideView}>
      <div className="review">{review.reviewContent}</div>
      <ListInfo>
        <div className="star_box">
          <StarFilled />
          <span>{review.starCount}</span>
        </div>
        <KeywordBox>
          <ul>
            {review.keywords
              .filter((_, idx) => idx < 2)
              .map((keyword, idx) => (
                <li key={idx}>
                  <span>{keyword}</span>
                </li>
              ))}
          </ul>
        </KeywordBox>

        <ReviewWirter>
          <p className="user">편의점 매니아</p>
          <p className="day">2022.11.17</p>
        </ReviewWirter>
      </ListInfo>
    </ListContainer>
  )
}

export default ReviewList
