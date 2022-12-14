import { StoreWrapper, StoreMapWrapper } from './Store.styles'
import React, { useState, useEffect, useRef } from 'react'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import ReviewList from '@components/StoreDisplay/ReviewListContainer/ReviewListContainer'
import Map from '@components/Map/Map'
import { displayMe } from '@services/kakao'

const Store = () => {
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
    <StoreWrapper>
      <StoreBasicInfo />
      <ReviewList />
      <StoreMapWrapper>
        <Map ref={mapRef} />
      </StoreMapWrapper>
    </StoreWrapper>
  )
}

export default Store
