import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@stores/store'
import { ReviewType } from '@stores/review/reviewType'
import ReviewList from '@components/StoreDisplay/ReviewList/ReviewList'

import { PlusOutlined } from '@ant-design/icons'
import FunButton, { BUTTON_TYPE_CLASSES } from '@styles/FunButton'
import {
  ReviewListWrapper,
  ReviewTop,
  NameNCount,
  ListContainer,
} from './ReviewListContainer.styles'
import URLUtill from '@utils/urlUtill'
import { fetchAllReviews, initReviews } from '@stores/review/reivewSlice'
import { REVIEW_SIZE } from '@utils/constants'

const ReviewListContainer = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const reviews = useSelector((state: RootState) => state.review.reviews)
  const user = useSelector((state: RootState) => state.user.user)
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const reviewCount = selectedStore?.reviewCount
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const moveToWrite = () => {
    if (storeId) {
      navigate(URLUtill.getReviewWriteUrl(storeId))
    }
  }

  useEffect(() => {
    if (reviews.length > 0) dispatch(initReviews())
  }, [])

  useEffect(() => {
    if (reviewCount) setPageCount(Math.ceil(reviewCount / REVIEW_SIZE - 1))
  }, [reviewCount])

  useEffect(() => {
    if (storeId) dispatch(fetchAllReviews({ storeId, page }))
  }, [page])

  return (
    <ReviewListWrapper>
      <ReviewTop>
        <NameNCount>
          <h1>REVIEW</h1>
          <div className="count">
            <PlusOutlined />
            <p>{selectedStore?.reviewCount}</p>
          </div>
        </NameNCount>
        <div className="button">
          <FunButton
            buttonType={BUTTON_TYPE_CLASSES.base}
            name={'작성하기'}
            className={user ? '' : 'disabled'}
            onClick={moveToWrite}
          />
        </div>
      </ReviewTop>

      <ListContainer>
        {reviews.map((review) => (
          <ReviewList
            key={review.reviewEntryNo}
            reviewId={review.reviewEntryNo}
            starCount={review.starCount}
            createdDate={review.createdDate}
            keywords={review.keywords}
            reviewContent={review.reviewContent}
            userId={review.userEmail}
          />
        ))}

        {page < pageCount && (reviewCount as number) > 0 && (
          <FunButton
            name={'더보기'}
            className="opposite"
            onClick={() => {
              setPage(page + 1)
            }}
          />
        )}
        {(reviewCount as number) === 0 && (
          <p className="noReview">등록된 리뷰가 없습니다.</p>
        )}
      </ListContainer>
    </ReviewListWrapper>
  )
}

export default ReviewListContainer
