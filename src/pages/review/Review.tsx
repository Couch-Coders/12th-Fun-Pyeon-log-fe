import { ReviewWrapper, ReviewMapWrapper } from './Review.styles'
import React, { useState, useEffect, useRef } from 'react'
import ReviewBasicInfo from '@components/Review/ReviewBasicInfo/ReviewBasicInfo'
import ReviewList from '@components/Review/ReviewListContainer/ReviewListContainer'
import Map from '@components/Map/Map'
import { displayMe } from '@services/kakao'

const Review = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({
    lat: 37.54699,
    lng: 127.09598,
  })

  useEffect(() => {
    if (mapRef.current) mapRef.current.innerHTML = ''
    const mapContainer = mapRef.current as HTMLDivElement

    const mapOption = {
      center: new kakao.maps.LatLng(myPosition.lat, myPosition.lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }

    const map = new kakao.maps.Map(mapContainer, mapOption)
    // 임의의 편의점 위치에 마커 생성
    displayMe(map, new kakao.maps.LatLng(myPosition.lat, myPosition.lng))
  }, [])

  return (
    <ReviewWrapper>
      <ReviewBasicInfo />
      <ReviewList />
      <ReviewMapWrapper>
        <Map ref={mapRef} />
      </ReviewMapWrapper>
    </ReviewWrapper>
  )
}

export default Review
