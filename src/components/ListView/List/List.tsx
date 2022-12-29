import React, { useContext, useEffect } from 'react'
import KeywordBadge from '@components/styles/KeywordBadge'
import { MapContext } from '@context/MapContext'
import kakaoService from '@services/kakaoService'
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
  const { mapApi, selectedMarker } = useContext(MapContext)
  const center = new kakao.maps.LatLng(lat, lng)
  const listClickHandler = () => {
    if (mapApi) {
      const content = kakaoService.overlayContainer({
        placeName,
        storeId,
        address,
        phoneNumber,
        reviewCount,
        starCount,
      })
      kakaoService.overlay.setPosition(center)
      kakaoService.overlay.setContent(content)
      kakaoService.overlay.setMap(mapApi)
      mapApi.panTo(center)
    }
  }

  useEffect(() => {
    console.log(selectedMarker?.getTitle())
  }, [selectedMarker])

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
