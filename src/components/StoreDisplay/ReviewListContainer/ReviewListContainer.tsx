import React, { useEffect, useState } from 'react'
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
import { fetchAllReviews } from '@stores/review/reivewSlice'

const ReviewListContainer = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const reviews = useSelector((state: RootState) => state.review.reviews)

  const user = useSelector((state: RootState) => state.user.user)
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const reviewCount = selectedStore?.reviewCount
  const [reviewList, setReviewList] = useState<ReviewType[]>(reviews)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)

  const dispatch = useAppDispatch()

  const moveToWrite = () => {
    if (storeId) {
      navigate(URLUtill.getReviewWriteUrl(storeId))
    }
  }

  // useEffect(() => {
  //   console.log(reviews)

  //   if (reviews.length) {
  //     setReviewList(reviews)
  //   }
  // }, [reviews])

  useEffect(() => {
    if (storeId) {
      dispatch(fetchAllReviews({ storeId, page }))
      setReviewList([...reviewList, ...reviews])
    }
    console.log(reviews)
  }, [page])

  useEffect(() => {
    if (reviewCount) setPageCount(Math.ceil(reviewCount / 2))
  }, [reviewCount])

  // const viewMore = () => {
  //   console.log(page)

  //   if (storeId) dispatch(fetchAllReviews({ storeId, page: page }))

  // }

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
        {reviewList.map((review) => (
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

        {page < pageCount && (
          <FunButton
            name={'더보기'}
            className="opposite"
            onClick={() => {
              setPage(page + 1)
              // viewMore()
            }}
          />
        )}
      </ListContainer>
    </ReviewListWrapper>
  )
}

export default ReviewListContainer
