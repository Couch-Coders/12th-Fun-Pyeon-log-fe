import React, { useEffect } from 'react'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { StoreWrapper } from '@pages/store/Store.styles'
import { useSelector } from 'react-redux'
import { RootState } from '@stores/store'
import { useNavigate } from 'react-router-dom'

const Write = () => {
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      alert('잘못된 접근입니다.')
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <StoreWrapper>
      <StoreBasicInfo />
      <WritingBox />
    </StoreWrapper>
  )
}

export default Write
