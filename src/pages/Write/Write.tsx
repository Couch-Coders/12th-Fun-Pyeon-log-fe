import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import LoadingWithLogo from '@components/styles/LoadingWithLogo'
import WritingBox from '@components/Writing/WritingBox/WritingBox'
import { RootState } from '@stores/store'
import URLUtill from '@utils/urlUtill'
import { StoreWrapper } from '@pages/Store/Store.styles'

const Write = () => {
  const { storeId } = useParams()
  const user = useSelector((state: RootState) => state.user.user)
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const loading = useSelector((state: RootState) => state.review.loading)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && storeId && selectedStore) {
      alert('로그인 후 이용 가능합니다.')
      navigate(URLUtill.getStoreUrl(storeId, selectedStore.place_name))
    }
  }, [])

  return (
    <StoreWrapper>
      {loading && <LoadingWithLogo />}
      <StoreBasicInfo />
      <WritingBox />
    </StoreWrapper>
  )
}

export default Write
