import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import Map from '@components/Map/Map'
import ReviewListContainer from '@components/StoreDisplay/ReviewListContainer/ReviewListContainer'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import LoadingWithLogo from '@components/styles/LoadingWithLogo'
import { MapContext } from '@context/MapContext'
import kakaoServie from '@services/kakaoService'
import { fetchStoreInfo } from '@stores/conv/convSlice'
import { initReviews } from '@stores/review/reivewSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { StoreWrapper, StoreMapWrapper } from './Store.styles'

const Store = () => {
  const dispatch = useAppDispatch()
  const [storeParam] = useSearchParams()
  const { mapApi, addMarkers, deleteMarkers } = useContext(MapContext)
  const { storeId } = useParams<string>()
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const loading = useSelector((state: RootState) => state.conv.loading)

  useEffect(() => {
    const encodedAddress = storeParam.get('address')
    if (storeId && encodedAddress) {
      const decodedAddress = decodeURIComponent(encodedAddress)
      dispatch(fetchStoreInfo({ storeId, decodedAddress }))
      dispatch(initReviews())
    }
  }, [storeId, dispatch, storeParam])

  useEffect(() => {
    if (mapApi instanceof kakao.maps.Map) {
      deleteMarkers()
      if (selectedStore?.y) {
        const [storeBrand] = selectedStore.place_name
          ? selectedStore.place_name.split(' ', 1)
          : ['펀편log']

        const center = new kakao.maps.LatLng(
          Number(selectedStore.y),
          Number(selectedStore.x)
        ) // 지도의 중심좌표 재설정
        mapApi.setCenter(center)
        mapApi.setLevel(3)
        // 편의점 위치에 마커 생성
        const marker = kakaoServie.displayMyLocation(mapApi, center, storeBrand)
        addMarkers(marker)
      } else {
        const center = new kakao.maps.LatLng(
          Number(DEFAULT_KAKAO_COORD.lat),
          Number(DEFAULT_KAKAO_COORD.lng)
        )
        mapApi.setCenter(center)
        mapApi.setLevel(3)
        // 임의의 편의점 위치에 마커 생성
        const marker = kakaoServie.displayMyLocation(mapApi, center)
        addMarkers(marker)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore, mapApi, addMarkers])

  return (
    <StoreWrapper>
      {loading && <LoadingWithLogo />}
      <StoreBasicInfo />
      <ReviewListContainer />
      <StoreMapWrapper>
        <Map />
      </StoreMapWrapper>
    </StoreWrapper>
  )
}

export default Store
