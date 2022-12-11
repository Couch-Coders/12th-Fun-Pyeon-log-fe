import { ReviewWrapper } from './Review.styles'
import React from 'react'
import ReviewBasicInfo from '@components/Review/ReviewBasicInfo/ReviewBasicInfo'
import ReviewList from '@components/Review/ReviewList/ReviewList'

const Review = () => {
  return (
    <ReviewWrapper>
      Review
      <ReviewBasicInfo />
      <ReviewList />
      <div id="map" className="map"></div>
    </ReviewWrapper>
  )
}

export default Review
