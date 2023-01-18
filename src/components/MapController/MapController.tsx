import React, { useEffect, useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'
import FunButton, { BUTTON_TYPE_CLASSES } from '@components/styles/FunButton'
import { MapContext } from '@context/MapContext'
import KakaoService from '@services/kakaoService'
import { RootState } from '@stores/store'
import useSearchStore from 'hooks/useSearchStore'
import { AimOutlined } from '@ant-design/icons'
import { ControlBtns } from './MapController.styles'

// 카카오 서치 함수 구분용 타입
export enum SearchType {
  KEYWORD = 'KEYWORD',
  CATEGORY = 'CATEGORY',
}

interface MapControllerProps {
  mapApi: kakao.maps.Map
  userPosition: {
    lat: number
    lng: number
  }
}

const MapController: React.FC<MapControllerProps> = ({
  mapApi,
  userPosition,
}) => {
  const searchWord = useSelector((state: RootState) => state.sort.searchWord)
  const searchedCoord = useSelector(
    (state: RootState) => state.sort.searchedCoord
  )
  const { deleteMarkers } = useContext(MapContext)
  const { searchStore } = useSearchStore()

  useEffect(() => {
    if (searchedCoord) {
      const center = new kakao.maps.LatLng(searchedCoord.lat, searchedCoord.lng)
      mapApi.setCenter(center)
    }
    searchStore(SearchType.CATEGORY, mapApi)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStore])

  // 기존에 생성한 마커가 있을 시 마커와 인포윈도우를 지우는 함수
  // const removeMarkerNInfo = useCallback(() => {
  //   // 펼쳐진 오버레이 삭제
  //   KakaoService.overlay.setMap(null)
  //   deleteMarkers()
  // }, [deleteMarkers])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    // removeMarkerNInfo()
    if (searchWord.length > 0) {
      searchStore(SearchType.KEYWORD, mapApi, searchWord)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchWord, searchStore])

  //  지도를 사용자의 위치로 이동하는 함수
  const moveToUserLocation = () => {
    // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    // removeMarkerNInfo()
    const locPosition = new kakao.maps.LatLng(
      userPosition.lat,
      userPosition.lng
    )

    mapApi.setCenter(locPosition)
    searchStore(SearchType.CATEGORY, mapApi)
  }

  const searchFromHereHandler = () => {
    // removeMarkerNInfo()
    searchStore(SearchType.CATEGORY, mapApi)
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
        onClick={moveToUserLocation}
        className="web"
      >
        내 위치로 이동
      </FunButton>
      <FunButton
        buttonType={BUTTON_TYPE_CLASSES.map}
        onClick={moveToUserLocation}
        className="tablet"
      >
        <AimOutlined />
      </FunButton>
    </ControlBtns>
  )
}

export default MapController
