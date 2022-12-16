import React, { useEffect, useState } from 'react'
import ReviewList from '@components/StoreDisplay/ReviewList/ReviewList'
import { PlusOutlined } from '@ant-design/icons'
import FunButton, { BUTTON_TYPE_CLASSES } from '@styles/FunButton'
import {
  ReviewListWrapper,
  ReviewTop,
  NameNCount,
  ListContainer,
} from './ReviewListContainer.styles'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@stores/store'
import { ReviewType } from '@stores/review/reviewType'
import Spinner from '@styles/Spinner'

const ReviewListContainer = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const [reviewList, setReviewList] = useState<ReviewType[]>([])
  const reviews = useSelector((state: RootState) => state.review.reviews)
  const loading = useSelector((state: RootState) => state.review.loading)

  const moveToWrite = () => {
    if (storeId) {
      navigate(`/stores/${storeId}/write`)
    } else {
      navigate('/')
    }
  }

  useEffect(() => {
    if (reviews.length) {
      setReviewList(reviews)
    }
  }, [reviews])

  return (
    <ReviewListWrapper>
      <ReviewTop>
        <NameNCount>
          <h1>REVIEW</h1>
          <div className="count">
            <PlusOutlined />
            <p>{reviewList.length}</p>
          </div>
        </NameNCount>
        <div className="button">
          <FunButton
            buttonType={BUTTON_TYPE_CLASSES.base}
            name={'작성하기'}
            onClick={moveToWrite}
          />
        </div>
      </ReviewTop>
      <ListContainer>
        {reviewList.map((review) => (
          <ReviewList
            key={review.reviewId}
            starCount={review.starCount}
            createdDate={review.createdDate}
            keywords={review.keywords}
            reviewContent={review.reviewContent}
            userId={review.user}
          />
        ))}
      </ListContainer>
    </ReviewListWrapper>
  )
}

export default ReviewListContainer
