import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, StarFilled } from '@ant-design/icons'
import {
  ListContainer,
  ListInfo,
  KeywordBox,
  ReviewWirter,
  ReviewEditButton,
} from './ReviewList.styles'
import { useSelector } from 'react-redux'
import { RootState } from '@stores/store'

interface ReviewType {
  reviewContent: string
  createdDate: Date
  starCount: number
  keywords: string[]
  userId: string
}

const ReviewList: React.FC<ReviewType> = ({
  createdDate,
  reviewContent,
  starCount,
  keywords,
  userId,
}) => {
  const [isWideView, setIsWideView] = useState<boolean>(false)

  const onWideViewHandler = () => {
    setIsWideView(!isWideView)
  }

  return (
    <ListContainer isWide={isWideView}>
      {userId === 1 && (
        <ReviewEditButton>
          <button>
            <EditOutlined />
          </button>
          <button>
            <DeleteOutlined />
          </button>
        </ReviewEditButton>
      )}
      <div className="review" onDoubleClick={onWideViewHandler}>
        {reviewContent}
      </div>
      <ListInfo>
        <div className="star_box">
          <StarFilled />
          <span>{starCount}</span>
        </div>
        <KeywordBox>
          <ul>
            {keywords
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
          <p className="day">{createdDate}</p>
        </ReviewWirter>
      </ListInfo>
    </ListContainer>
  )
}

export default ReviewList
