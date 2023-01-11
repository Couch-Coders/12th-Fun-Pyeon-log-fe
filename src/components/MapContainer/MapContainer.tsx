import React, { useEffect, useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'
import FunButton, { BUTTON_TYPE_CLASSES } from '@components/styles/FunButton'
import { MapContext } from '@context/MapContext'
import KakaoService from '@services/kakaoService'
import { RootState } from '@stores/store'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import useSearchStore from 'hooks/useSearchStore'
import { AimOutlined } from '@ant-design/icons'
import { ControlBtns } from './MapContainer.styles'

// 카카오 서치 함수 구분용 타입
export enum SearchType {
  KEYWORD = 'KEYWORD',
  CATEGORY = 'CATEGORY',
}

const MapContainer = () => {
  const searchWord = useSelector((state: RootState) => state.sort.searchWord)
  const searchedCoord = useSelector(
    (state: RootState) => state.sort.searchedCoord
  )
  const userPosition = useSelector((state: RootState) => state.user.userPostion)
  const { searchStore } = useSearchStore()
  const { deleteMarkers, mapApi } = useContext(MapContext)

  useEffect(() => {
    if (mapApi instanceof kakao.maps.Map) {
      if (searchedCoord) {
        const center = new kakao.maps.LatLng(
          searchedCoord.lat,
          searchedCoord.lng
        )
        mapApi.setCenter(center)
      }
      searchStore(SearchType.CATEGORY, mapApi)
    }
  }, [mapApi, searchStore])

  // 기존에 생성한 마커가 있을 시 마커와 인포윈도우를 지우는 함수
  const removeMarkerNInfo = useCallback(() => {
    // 펼쳐진 오버레이 삭제
    KakaoService.overlay.setMap(null)
    deleteMarkers()
  }, [deleteMarkers])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    if (mapApi instanceof kakao.maps.Map) {
      removeMarkerNInfo()
      if (searchWord.length > 0) {
        searchStore(SearchType.KEYWORD, mapApi, searchWord)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapApi, searchWord])

  //  지도를 사용자의 위치로 이동하는 함수
  const moveToCenter = () => {
    // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    if (mapApi) {
      removeMarkerNInfo()
      let locPosition
      if (!userPosition) {
        locPosition = new kakao.maps.LatLng(
          DEFAULT_KAKAO_COORD.lat,
          DEFAULT_KAKAO_COORD.lng
        )
        alert('현재 위치 정보가 없습니다. 기본 위치로 이동합니다.')
      } else {
        locPosition = new kakao.maps.LatLng(userPosition.lat, userPosition.lng)
      }
      mapApi.setCenter(locPosition)
      searchStore(SearchType.CATEGORY, mapApi)
    }
  }

  const searchFromHereHandler = () => {
    if (mapApi) {
      removeMarkerNInfo()
      searchStore(SearchType.CATEGORY, mapApi)
    }
  }

  return (
    <ControlBtns>
      <FunButton
        buttonType={BUTTON_TYPE_CLASSES.map}
        onClick={searchFromHereHandler}
      >
        이 위치에서 다시 검색
      </FunButton>
      <FunButton
        buttonType={BUTTON_TYPE_CLASSES.map}
        onClick={moveToCenter}
        className="web"
      >
        내 위치로 이동
      </FunButton>
      <FunButton
        buttonType={BUTTON_TYPE_CLASSES.map}
        onClick={moveToCenter}
        className="tablet"
      >
        <AimOutlined />
      </FunButton>
    </ControlBtns>
  )
}

export default MapContainer
