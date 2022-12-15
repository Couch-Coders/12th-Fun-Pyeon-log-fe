import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { fetchStoreInfo } from '@stores/conv/convSlice'
import { RootState, useAppDispatch } from '@stores/store'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import ReviewListContainer from '@components/StoreDisplay/ReviewListContainer/ReviewListContainer'
import Map from '@components/Map/Map'
import kakaoServie from '@services/kakaoService'
import { StoreWrapper, StoreMapWrapper } from './Store.styles'
import { fetchAllReviews } from '@stores/review/reivewSlice'
import { useSelector } from 'react-redux'

const Store = () => {
  const dispatch = useAppDispatch()

  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const { storeId } = useParams<string>()
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({
    lat: 37.54699,
    lng: 127.09598,
  })

  useEffect(() => {
    if (mapRef.current) mapRef.current.innerHTML = ''
    const mapContainer = mapRef.current as HTMLDivElement
    if (selectedStore) {
      if (!selectedStore.y) {
        const mapOption = {
          center: new kakao.maps.LatLng(myPosition.lat, myPosition.lng), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(mapContainer, mapOption)
        // 임의의 편의점 위치에 마커 생성
        kakaoServie.displayMyLocation(
          map,
          new kakao.maps.LatLng(myPosition.lat, myPosition.lng)
        )
      } else {
        const mapOption = {
          center: new kakao.maps.LatLng(+selectedStore.y, +selectedStore.x), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        }
        const map = new kakao.maps.Map(mapContainer, mapOption)
        // 임의의 편의점 위치에 마커 생성
        kakaoServie.displayMyLocation(
          map,
          new kakao.maps.LatLng(+selectedStore.y, +selectedStore.x)
        )
      }
    }
  }, [selectedStore, myPosition.lat, myPosition.lng])

  useEffect(() => {
    if (storeId) {
      dispatch(fetchStoreInfo(storeId))
      dispatch(fetchAllReviews(storeId))
    }
  }, [storeId, dispatch])

  return (
    <StoreWrapper>
      <StoreBasicInfo />
      <ReviewListContainer />
      <StoreMapWrapper>
        <Map ref={mapRef} />
      </StoreMapWrapper>
    </StoreWrapper>
  )
}

export default Store
