import React, { useContext } from 'react'
import kakaoService from '@services/kakaoService'
import { MapContext } from '@context/MapContext'
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
}

const List: React.FC<ListProps> = ({
  placeName,
  lat,
  lng,
  storeId,
  starCount,
  reviewCount,
  keywords,
}) => {
  const { mapApi } = useContext(MapContext)
  const center = new kakao.maps.LatLng(lat, lng)
  const listClickHandler = () => {
    if (mapApi) {
      const content = kakaoService.overlayContainer(placeName, storeId)
      kakaoService.overlay.setPosition(center)
      kakaoService.overlay.setContent(content)
      kakaoService.overlay.setMap(mapApi)
      mapApi.panTo(center)
    }
  }

  return (
    <ConBox onClick={listClickHandler}>
      <Title>
        <h2>{placeName}</h2>
        <div className="star_box">
          <StarFilled />
          <span>{starCount}</span>
        </div>
      </Title>

      <Content>
        <ul>
          {keywords
            .filter((_, idx) => idx < 3)
            .map((keyword, idx) => (
              <li key={idx}>
                <span>{keyword}</span>
              </li>
            ))}
        </ul>

        <span className="review">리뷰 {reviewCount}개</span>
      </Content>
    </ConBox>
  )
}

export default List
