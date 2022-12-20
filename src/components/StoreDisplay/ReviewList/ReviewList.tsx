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
import { RootState, useAppDispatch } from '@stores/store'
import {
  deleteReview,
  fetchAllReviews,
  selectReview,
} from '@stores/review/reivewSlice'
import { useNavigate, useParams } from 'react-router-dom'
import URLUtill from '@utils/urlUtill'
import KeywordBadge from '@styles/KeywordBadge'

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
    window.confirm('리뷰를 삭제 하시겠습니까?')
    if (storeId) {
      await dispatch(deleteReview({ storeId, reviewId }))
      await dispatch(fetchAllReviews(storeId))
    }
  }

  const editHandler = () => {
    dispatch(selectReview(reviewId))
    navigate(URLUtill.getReviewEditUrl(reviewId))
  }

  return (
    <ListContainer isWide={isWideView}>
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

        <ReviewWirter>
          <p className="user">{displayName}</p>
          <p className="day">{date}</p>
        </ReviewWirter>
      </ListInfo>
    </ListContainer>
  )
}

export default ReviewList
