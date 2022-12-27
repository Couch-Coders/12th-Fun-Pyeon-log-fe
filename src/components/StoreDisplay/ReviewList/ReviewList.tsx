import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import KeywordBadge from '@components/styles/KeywordBadge'
import { deleteReview, selectReview } from '@stores/review/reivewSlice'
import { RootState, useAppDispatch } from '@stores/store'
import URLUtill from '@utils/urlUtill'
import { DeleteOutlined, EditOutlined, StarFilled } from '@ant-design/icons'
import {
  ListContainer,
  ListInfo,
  KeywordBox,
  ReviewWirter,
  ReviewEditButton,
} from './ReviewList.styles'

interface ReviewType {
  reviewId: number
  reviewContent: string
  createdDate: string
  starCount: number
  keywords: string[]
  userId: string
}

const ReviewList: React.FC<ReviewType> = ({
  reviewId,
  createdDate,
  reviewContent,
  starCount,
  keywords,
  userId,
}) => {
  const { storeId } = useParams()
  const [isWideView, setIsWideView] = useState<boolean>(false)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.user.user)
  const [date] = createdDate.split('T')
  const [displayName] = userId.split('@')
  const onWideViewHandler = () => {
    setIsWideView(!isWideView)
  }

  const deleteRevieHandler = async () => {
    if (window.confirm('리뷰를 삭제 하시겠습니까?')) {
      if (storeId) {
        await dispatch(deleteReview({ storeId, reviewId }))
        location.reload()
      }
    }
  }

  const editHandler = () => {
    dispatch(selectReview(reviewId))
    if (storeId) navigate(URLUtill.getReviewEditUrl(reviewId))
  }

  return (
    <ListContainer isWide={isWideView}>
      <ReviewWirter>
        <p className="user">{displayName}</p>
        <p className="day">{date}</p>
      </ReviewWirter>
      {userId === user?.email && (
        <ReviewEditButton>
          <button onClick={editHandler}>
            <EditOutlined />
          </button>
          <button onClick={deleteRevieHandler}>
            <DeleteOutlined />
          </button>
        </ReviewEditButton>
      )}
      <div className="review" onDoubleClick={onWideViewHandler}>
        <span>{reviewContent}</span>
      </div>
      <ListInfo>
        <div className="star_box">
          <StarFilled />
          <span>{starCount}</span>
        </div>
        <KeywordBox isWide={isWideView}>
          <ul>
            {isWideView
              ? keywords.map((keyword) => (
                  <KeywordBadge key={keyword}>{keyword}</KeywordBadge>
                ))
              : keywords
                  .slice(0, 2)
                  .map((keyword) => (
                    <KeywordBadge key={keyword}>{keyword}</KeywordBadge>
                  ))}
          </ul>
        </KeywordBox>
      </ListInfo>
    </ListContainer>
  )
}

export default ReviewList
