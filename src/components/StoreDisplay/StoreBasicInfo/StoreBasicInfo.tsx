import React, { useLayoutEffect, useRef, useState } from 'react'
import funlogImg from '../../../assets/convImg/funlog.png'
import { PhoneFilled, PushpinFilled, StarFilled } from '@ant-design/icons'
import {
  ConvImgWrapper,
  InfoContainer,
  ConvInfo,
  KeywordBox,
  StarPoint,
} from './StoreBasicInfo.styles'
import { getBrandImg } from '@services/markerImg'
import { useSelector } from 'react-redux'
import { RootState } from '@stores/store'
import KeywordBadge from '@styles/KeywordBadge'

interface StoreInfo {
  storeImg: string
  place_name: string
  address_name: string
  phone: string
  keywordList: string[]
  starCount: number
}

const StoreBasicInfo = () => {
  const imgRef = useRef<HTMLImageElement | null>(null)
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    storeImg: funlogImg,
    place_name: 'FUN편로그 편의점',
    phone: '  02-525-2525',
    address_name: ' 서울시 어쩌구 무슨무슨로 2-1',
    starCount: 3,
    keywordList: ['제품이 다양해요', '매장이 청결해요', '펀편로그 좋아요'],
  })

  useLayoutEffect(() => {
    if (selectedStore) {
      const [placeName] = selectedStore.place_name.split(' ', 1)
      setStoreInfo((prevState) => {
        return {
          prevState,
          ...selectedStore,
          storeImg: getBrandImg(placeName) ?? funlogImg,
        }
      })
    }
  }, [selectedStore])

  return (
    <InfoContainer>
      <ConvImgWrapper>
        <img src={storeInfo.storeImg} ref={imgRef} />
      </ConvImgWrapper>

      <ConvInfo>
        <h1>{storeInfo.place_name}</h1>
        <p>
          <span>
            <PushpinFilled />
            {storeInfo.address_name}
          </span>
          <span>
            <PhoneFilled />
            {storeInfo.phone}
          </span>
        </p>
        <KeywordBox>
          <ul>
            {storeInfo.keywordList.slice(0, 5).map((keyword) => (
              <KeywordBadge key={keyword}>{keyword}</KeywordBadge>
            ))}
          </ul>
        </KeywordBox>
      </ConvInfo>
      <StarPoint>
        <StarFilled />
        <p>{storeInfo.starCount}/ 5</p>
      </StarPoint>
    </InfoContainer>
  )
}

export default StoreBasicInfo
