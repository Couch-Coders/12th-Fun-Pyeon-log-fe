import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import Map from '@components/Map/Map'
import ReviewListContainer from '@components/StoreDisplay/ReviewListContainer/ReviewListContainer'
import StoreBasicInfo from '@components/StoreDisplay/StoreBasicInfo/StoreBasicInfo'
import LoadingWithLogo from '@components/styles/LoadingWithLogo'
import { MapContext } from '@context/MapContext'
import { fetchStoreInfo } from '@stores/conv/convSlice'
import { initReviews } from '@stores/review/reivewSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { StoreWrapper, StoreMapWrapper } from './Store.styles'

const Store = () => {
  const dispatch = useAppDispatch()
  const [storeParam] = useSearchParams()
  const { mapApi, deleteMarkers, kakaoService, displayMyLocation } =
    useContext(MapContext)
  const storeMarkerRef = useRef<kakao.maps.Marker>()
  const { storeId } = useParams()
  const selectedStore = useSelector(
    (state: RootState) => state.conv.selectedStore
  )
  const loading = useSelector((state: RootState) => state.conv.loading)

  useEffect(() => {
    const encodedAddress = storeParam.get('address')
    if (storeId && encodedAddress && kakaoService) {
      const kakaoSearch = new kakaoService.maps.services.Places()
      const decodedAddress = decodeURIComponent(encodedAddress)
      const searchedStore: kakao.maps.services.PlacesSearchResult = []
      kakaoSearch.keywordSearch(`${decodedAddress} 편의점`, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const searchedstore = data.filter((store) => store.id === storeId)
          searchedStore.push(...searchedstore)
        }
      })
      dispatch(fetchStoreInfo({ storeId, searchedStore }))
      dispatch(initReviews())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, dispatch, storeParam])

  useEffect(() => {
    if (!mapApi || !kakaoService) return

    deleteMarkers()
    if (storeMarkerRef.current) {
      storeMarkerRef.current.setMap(null)
    }
    if (selectedStore) {
      const [storeBrand] = selectedStore.place_name
        ? selectedStore.place_name.split(' ', 1)
        : ['펀편log']

      const center = new kakaoService.maps.LatLng(
        Number(selectedStore.y),
        Number(selectedStore.x)
      ) // 지도의 중심좌표 재설정
      mapApi.setCenter(center)
      mapApi.setLevel(3)
      // 편의점 위치에 마커 생성
      storeMarkerRef.current = displayMyLocation(kakaoService, storeBrand)
    } else {
      const center = new kakaoService.maps.LatLng(
        Number(DEFAULT_KAKAO_COORD.lat),
        Number(DEFAULT_KAKAO_COORD.lng)
      )
      mapApi.setCenter(center)
      mapApi.setLevel(3)
      // 임의의 편의점 위치에 마커 생성
      storeMarkerRef.current = displayMyLocation(kakaoService)
    }
    storeMarkerRef.current?.setMap(mapApi)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore, deleteMarkers, mapApi, displayMyLocation])

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
