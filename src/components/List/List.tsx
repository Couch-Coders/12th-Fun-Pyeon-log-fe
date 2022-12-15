import React, { useContext } from 'react'
import kakaoService from '@services/kakaoService'
import { MapContext } from '@context/MapContext'
import { StarFilled } from '@ant-design/icons'
import { ConBox, Title, Content } from './List.styles'

interface ListProps {
  placeName: string
  lat: number
  lng: number
}

const List: React.FC<ListProps> = ({ placeName, lat, lng }) => {
  const { mapApi } = useContext(MapContext)
  const center = new kakao.maps.LatLng(lat, lng)

  const listClickHandler = () => {
    if (mapApi) {
      const content = kakaoService.overlayContainer(placeName)
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
          <span>4.7</span>
        </div>
      </Title>

      <Content>
        <ul>
          <li>
            <span>제품이 다양해요</span>
          </li>
          <li>
            <span>트렌디한 상품이 많아요</span>
          </li>
          <li>
            <span>접근성이 좋아요</span>
          </li>
        </ul>

        <span className="review">리뷰 40개</span>
      </Content>
    </ConBox>
  )
}

export default List
