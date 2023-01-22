import React from 'react'
import { useSelector } from 'react-redux'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import LoadingWithLogo from '@components/styles/LoadingWithLogo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { RootState } from '@stores/store'

import { StoreWrapper } from '@pages/Store/Store.styles'

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
