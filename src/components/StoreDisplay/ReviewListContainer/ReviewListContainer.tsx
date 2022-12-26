import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ReviewList from '@components/StoreDisplay/ReviewList/ReviewList'
import FunButton, { BUTTON_TYPE_CLASSES } from '@components/styles/FunButton'
import { fetchAllReviews, initReviews } from '@stores/review/reivewSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { REVIEW_SIZE } from '@utils/constants'
import URLUtill from '@utils/urlUtill'
import { PlusOutlined } from '@ant-design/icons'
import {
  ReviewListWrapper,
  ReviewTop,
  NameNCount,
  ListContainer,
} from './ReviewListContainer.styles'

const ReviewListContainer = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const reviews = useSelector((state: RootState) => state.review.reviews)
  const user = useSelector((state: RootState) => state.user.user)
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const reviewCount = selectedStore?.reviewCount ?? 0
  const newReviews = reviews.filter((review, idx) => {
    return (
      reviews.findIndex((review1, idx1) => {
        return review.reviewEntryNo === review1.reviewEntryNo
      }) === idx
    )
  })

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
  }, [page, storeId, dispatch])

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
        {newReviews.map((review) => (
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

        {page < pageCount && reviewCount > 0 && (
          <FunButton
            name={'더보기'}
            className="opposite"
            onClick={() => {
              setPage(page + 1)
            }}
          />
        )}
        {reviewCount === 0 && (
          <p className="noReview">등록된 리뷰가 없습니다.</p>
        )}
      </ListContainer>
    </ReviewListWrapper>
  )
}

export default ReviewListContainer
