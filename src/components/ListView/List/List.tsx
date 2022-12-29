import React, { useContext } from 'react'
import KeywordBadge from '@components/styles/KeywordBadge'
import { MapContext } from '@context/MapContext'
import KakaoService from '@services/kakaoService'
import { setClickedStore } from '@stores/conv/convSlice'
import { useAppDispatch } from '@stores/store'
import { StarFilled } from '@ant-design/icons'
import { ConBox, Title, Content } from './List.styles'

interface ListProps {
  placeName: string
  lat: number
  lng: number
  storeId: string
  starCount: number
  keywords: string[]
  reviewCount: number
  address: string
  phoneNumber: string
}

const List: React.FC<ListProps> = ({
  placeName,
  lat,
  lng,
  storeId,
  starCount,
  reviewCount,
  keywords,
  address,
  phoneNumber,
}) => {
  const { mapApi } = useContext(MapContext)
  const center = new kakao.maps.LatLng(lat, lng)
  const dispatch = useAppDispatch()
  const listClickHandler = () => {
    if (mapApi) {
      KakaoService.overlay.setPosition(center)
      KakaoService.overlay.setContent('<div id="kakao-overlay"></div>')
      KakaoService.overlay.setMap(mapApi)
      mapApi.panTo(center)
      dispatch(
        setClickedStore({
          placeName,
          storeId,
          address,
          phoneNumber,
          reviewCount,
          starCount,
        })
      )
    }
  }

  return (
    <ConBox
      onClick={() => {
        listClickHandler()
      }}
    >
      <Title>
        <h2>{placeName}</h2>
        <div className="star_box">
          <StarFilled />
          <span>{starCount}</span>
        </div>
      </Title>

      <Content>
        <ul>
          {keywords.slice(0, 3).map((keyword) => (
            <KeywordBadge key={keyword}>{keyword}</KeywordBadge>
          ))}
        </ul>

        <span className="review">리뷰 {reviewCount}개</span>
      </Content>
    </ConBox>
  )
}

export default List
