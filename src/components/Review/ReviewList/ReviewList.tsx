import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, StarFilled } from '@ant-design/icons'
import {
  ListContainer,
  ListInfo,
  KeywordBox,
  ReviewWirter,
  ReviewEditButton,
} from './ReviewList.styles'

interface ReviewType {
  reviewContent: string
  createdDate: string
  starCount: number
  keywords: string[]
  userId: number
}

interface ReviewListProps {
  review: ReviewType
}

const ReviewList: React.FC<ReviewListProps> = ({ review }) => {
  const [isWideView, setIsWideView] = useState<boolean>(false)
  const date = review.createdDate

  const onWideViewHandler = () => {
    setIsWideView(!isWideView)
  }

  return (
    <ListContainer onDoubleClick={onWideViewHandler} isWide={isWideView}>
      <div className="review">{review.reviewContent}</div>
        <ReviewEditButton>
          <button>
            <EditOutlined />
          </button>
          <button>
            <DeleteOutlined />
          </button>
        </ReviewEditButton>
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
          <p className="day">{date}</p>
        </ReviewWirter>
      </ListInfo>
    </ListContainer>
  )
}

export default ReviewList
