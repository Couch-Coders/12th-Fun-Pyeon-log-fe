import React from 'react'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { StoreWrapper } from '@pages/store/Store.styles'

const Write = () => {
  return (
    <StoreWrapper>
      <StoreBasicInfo />
      <WritingBox />
    </StoreWrapper>
  )
}

export default Write
