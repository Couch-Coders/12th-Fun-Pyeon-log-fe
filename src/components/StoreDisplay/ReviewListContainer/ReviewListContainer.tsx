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

const reviewData = [
  {
    reviewId: 5,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱... 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.0,
    createdDate: new Date(2022, 12, 22),
    storeId: 1,
    user: ' 4',
    keywords: [
      '트렌디한 상품이 많아요',
      '분위기가 좋아요',
      '매장이 넓어요',

      '굿이에요',
    ],
  },
  {
    reviewId: 6,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.5,
    createdDate: new Date(2022, 12, 22),
    storeId: 1,
    user: ' 1',
    keywords: ['분위기가 좋아요', '매장이 넓어요'],
  },
  {
    reviewId: 7,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.7,
    createdDate: new Date(2022, 12, 22),
    storeId: 1,
    user: ' 6',
    keywords: ['분위기가 좋아요', '트렌디한 상품이 많아요', '굿이에요'],
  },
  {
    reviewId: 8,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱... 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.0,
    createdDate: new Date(2022, 12, 22),
    storeId: 1,
    user: ' 7',
    keywords: [
      '트렌디한 상품이 많아요',
      '분위기가 좋아요',
      '매장이 넓어요',

      '굿이에요',
    ],
  },
  {
    reviewId: 9,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.5,
    createdDate: new Date(2022, 12, 22),
    storeId: 1,
    user: ' 8',
    keywords: ['분위기가 좋아요', '매장이 넓어요'],
  },
  {
    reviewId: 11,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.7,
    createdDate: new Date(2022, 12, 22),
    storeId: 1,
    user: '31',
    keywords: ['분위기가 좋아요', '트렌디한 상품이 많아요', '굿이에요'],
  },
]

const ReviewListContainer = () => {
  const { storeId } = useParams()
  const [reviewList, setReviewList] = useState(reviewData)
  const navigate = useNavigate()

  const moveToWrite = () => {
    if (storeId) {
      navigate(`/stores/${storeId}/write`)
    } else {
      navigate('/')
    }
  }

  // 서버 통신이 되면 바뀔 부분
  // const [reviewList, setReviewList] = useState<ReviewType[]>([])
  // const reviews = useSelector((state: RootState) => state.review.reviews)

  // useEffect(() => {
  //   if (reviews.length) {
  //     setReviewList(reviews)
  //   }
  // }, [reviews])

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
