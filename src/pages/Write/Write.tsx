import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@stores/store'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { StoreWrapper } from '@pages/store/Store.styles'
import LoadingWithLogo from '@styles/LoadingWithLogo'

const Write = () => {
  const loading = useSelector((state: RootState) => state.review.loading)

  return (
    <StoreWrapper>
      {loading && <LoadingWithLogo />}
      <StoreBasicInfo />
      <WritingBox />
    </StoreWrapper>
  )
}

export default Write
