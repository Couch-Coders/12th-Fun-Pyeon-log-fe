import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import Map from '@components/Map/Map'
import ReviewListContainer from '@components/StoreDisplay/ReviewListContainer/ReviewListContainer'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import LoadingWithLogo from '@components/styles/LoadingWithLogo'
import kakaoServie from '@services/kakaoService'
import { fetchStoreInfo } from '@stores/conv/convSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { StoreWrapper, StoreMapWrapper } from './Store.styles'

const Store = () => {
  const dispatch = useAppDispatch()
  const [storeParam, setStoreParam] = useSearchParams()
  const { storeId } = useParams<string>()
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const loading = useSelector((state: RootState) => state.review.loading)
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [defaultCoord, setDefaultCoord] = useState({
    x: '127.09598',
    y: '37.54699',
  })

  useEffect(() => {
    const encodedAddress = storeParam.get('address')

    if (storeId && encodedAddress) {
      const decodedAddress = decodeURIComponent(encodedAddress)
      dispatch(fetchStoreInfo({ storeId, decodedAddress }))
    }
  }, [storeId, dispatch, storeParam])

  useEffect(() => {
    if (mapRef.current) mapRef.current.innerHTML = ''
    const mapContainer = mapRef.current as HTMLDivElement
    if (selectedStore?.y) {
      const [storeBrand] = selectedStore.place_name
        ? selectedStore.place_name.split(' ', 1)
        : '펀편log 편의점'.split(' ', 1)
      const mapOption = {
        center: new kakao.maps.LatLng(
          Number(selectedStore.y),
          Number(selectedStore.x)
        ), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }
      const map = new kakao.maps.Map(mapContainer, mapOption)
      // 편의점 위치에 마커 생성
      kakaoServie.displayMyLocation(
        map,
        new kakao.maps.LatLng(Number(selectedStore.y), Number(selectedStore.x)),
        storeBrand
      )
    } else {
      const mapOption = {
        center: new kakao.maps.LatLng(
          Number(defaultCoord.y),
          Number(defaultCoord.x)
        ), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }
      const map = new kakao.maps.Map(mapContainer, mapOption)
      // 임의의 편의점 위치에 마커 생성
      kakaoServie.displayMyLocation(
        map,
        new kakao.maps.LatLng(Number(defaultCoord.y), Number(defaultCoord.x))
      )
    }
  }, [selectedStore, defaultCoord.y, defaultCoord.x])

  return (
    <StoreWrapper>
      {loading && <LoadingWithLogo />}
      <StoreBasicInfo />
      <ReviewListContainer />
      <StoreMapWrapper>
        <Map ref={mapRef} />
      </StoreMapWrapper>
    </StoreWrapper>
  )
}

export default Store
