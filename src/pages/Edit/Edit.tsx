import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { ReviewType } from '@stores/review/reviewType'
import { RootState } from '@stores/store'
import { StoreWrapper } from '@pages/store/Store.styles'

const Edit = () => {
  const { storeId } = useParams()
  const navigate = useNavigate()
  const [originReview, setOriginReview] = useState<ReviewType>()
  const selectedReview = useSelector(
    (state: RootState) => state.review.selectedReview
  )

  useEffect(() => {
    if (selectedReview) {
      setOriginReview(selectedReview)
    } else if (storeId) {
      alert('잘못된 접근입니다.')
      navigate(`/stores/${storeId}`)
    }
  }, [])

  return (
    <StoreWrapper>
      <StoreBasicInfo />
      <WritingBox isEdit={true} originReview={originReview} />
    </StoreWrapper>
  )
}

export default Edit
