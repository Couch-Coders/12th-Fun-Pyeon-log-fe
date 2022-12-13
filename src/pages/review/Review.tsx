import { ReviewWrapper, ReviewMapWrapper } from './Review.styles'
import React, { useState, useEffect, useRef } from 'react'
import ReviewBasicInfo from '@components/Review/ReviewBasicInfo/ReviewBasicInfo'
import ReviewList from '@components/Review/ReviewListContainer/ReviewListContainer'

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
  }, [])

  return (
    <ReviewWrapper>
      <ReviewBasicInfo />
      <ReviewList />
      <ReviewMapWrapper>
        <div id="map" className="map" ref={mapRef}></div>
      </ReviewMapWrapper>
    </ReviewWrapper>
  )
}

export default Review
