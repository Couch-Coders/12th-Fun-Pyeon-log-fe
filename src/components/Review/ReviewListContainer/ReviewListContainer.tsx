import React, { useState } from 'react'
import ReviewList from '@components/Review/ReviewList/ReviewList'
import { PlusOutlined } from '@ant-design/icons'

import {
  ReviewListWrapper,
  ReviewTop,
  NameNCount,
  ListContainer,
} from './ReviewListContainer.styles'

const reviewData = [
  {
    reviewId: 5,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱... 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.0,
    createdDate: '2022. 12. 25',
    storeId: 1,
    userId: 3,
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
    createdDate: '2022. 12. 22',
    storeId: 1,
    userId: 3,
    keywords: ['분위기가 좋아요', '매장이 넓어요'],
  },
  {
    reviewId: 7,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.7,
    createdDate: '2022. 12. 20',
    storeId: 1,
    userId: 3,
    keywords: ['분위기가 좋아요', '트렌디한 상품이 많아요', '굿이에요'],
  },
  {
    reviewId: 8,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱... 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.0,
    createdDate: '2022. 12. 25',
    storeId: 1,
    userId: 3,
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
    createdDate: '2022. 12. 22',
    storeId: 1,
    userId: 3,
    keywords: ['분위기가 좋아요', '매장이 넓어요'],
  },
  {
    reviewId: 11,
    reviewContent:
      '자주 가는 편의점인데 너무 좋아요~ 신상도 많고 버터맥주도 있어요 짱짱...',
    starCount: 4.7,
    createdDate: '2022. 12. 20',
    storeId: 1,
    userId: 3,
    keywords: ['분위기가 좋아요', '트렌디한 상품이 많아요', '굿이에요'],
  },
]

const ReviewListContainer = () => {
  const [reviews, setReviews] = useState(reviewData)

  return (
    <ReviewListWrapper>
      <ReviewTop>
        <NameNCount>
          <h1>REVIEW</h1>
          <div className="count">
            <PlusOutlined />
            <p>{reviews.length}</p>
          </div>
        </NameNCount>
        <div className="button">
          <button>작성하기</button>
        </div>
      </ReviewTop>
      <ListContainer>
        {reviews.map((review) => (
          <ReviewList key={review.reviewId} review={review} />
        ))}
      </ListContainer>
    </ReviewListWrapper>
  )
}

export default ReviewListContainer
