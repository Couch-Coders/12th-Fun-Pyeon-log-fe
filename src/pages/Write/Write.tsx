import React, { useEffect } from 'react'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { StoreWrapper } from '@pages/store/Store.styles'
import { useSelector } from 'react-redux'
import { RootState } from '@stores/store'
import { useNavigate, useParams } from 'react-router-dom'

const Write = () => {
  const { storeId } = useParams()
  const user = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && storeId) {
      alert('로그인 후 이용 가능합니다.')
      navigate(`/stores/${storeId}`)
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
