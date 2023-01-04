import React, { useEffect, useState, useContext, useCallback } from 'react'
import { useSelector } from 'react-redux'
import Map from '@components/Map/Map'
import FunButton, { BUTTON_TYPE_CLASSES } from '@components/styles/FunButton'
import { MapContext } from '@context/MapContext'
import KakaoService from '@services/kakaoService'
import { fetchAllStores } from '@stores/conv/convSlice'
import { setSearchedCoord, saveSearchWord } from '@stores/sort/sortSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { AimOutlined } from '@ant-design/icons'
import { MapWrap, ControlBtns } from './MapContainer.styles'

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
  const dispatch = useAppDispatch()
  const { addMarkers, deleteMarkers, mapApi } = useContext(MapContext)
  // 사용자 좌표 저장
  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  })

  // 검색 함수 kakao map을 인자로 받아와 작동한다.
  const searchStore = useCallback(
    (searchType: SearchType, mapApi: kakao.maps.Map, searchTerm?: string) => {
      dispatch(saveSearchWord(''))
      if (searchType === SearchType.KEYWORD && searchTerm) {
        //  키워드 서치
        KakaoService.placeSearch.keywordSearch(
          `${searchTerm} 편의점`,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const { myMarker, lat, lng } = KakaoService.searchCallBack(
                data,
                mapApi,
                searchType
              )
              addMarkers(myMarker)
              dispatch(setSearchedCoord({ lat, lng }))
              dispatch(fetchAllStores({ mapData: data, map: mapApi }))
            }
          }
        )
      } else {
        //  카테고리 서치
        KakaoService.placeSearch.categorySearch(
          'CS2',
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const { myMarker, lat, lng } = KakaoService.searchCallBack(
                data,
                mapApi,
                searchType
              )
              addMarkers(myMarker)
              dispatch(setSearchedCoord({ lat, lng }))
              dispatch(fetchAllStores({ mapData: data, map: mapApi }))
            }
          },
          //  카테고리 서치 옵션
          {
            location: mapApi.getCenter(),
            sort: kakao.maps.services.SortBy.DISTANCE,
            useMapBounds: true,
          }
        )
      }
    },
    [dispatch, addMarkers]
  )

  // 처음 들어왔을 때
  useEffect(() => {
    if (mapApi instanceof kakao.maps.Map) {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser')
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude // 위도
          const lng = position.coords.longitude // 경도
          setMyPosition({ lat, lng })
          if (searchedCoord) {
            const center = new kakao.maps.LatLng(
              searchedCoord.lat,
              searchedCoord.lng
            )
            mapApi.setCenter(center)
          }
          searchStore(SearchType.CATEGORY, mapApi)
        },
        () => {
          if (!searchedCoord) {
            alert('위치동의를 하지 않아서 기본위치에서 시작합니다.')
          }
          searchStore(SearchType.CATEGORY, mapApi)
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (searchWord.length > 0) {
        removeMarkerNInfo()
        searchStore(SearchType.KEYWORD, mapApi, searchWord)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapApi, searchWord, searchStore])

  //  지도를 사용자의 위치로 이동하는 함수
  const moveToCenter = () => {
    removeMarkerNInfo()
    // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    if (mapApi) {
      let locPosition = new kakao.maps.LatLng(myPosition.lat, myPosition.lng)
      if (myPosition.lat === 0) {
        locPosition = new kakao.maps.LatLng(
          DEFAULT_KAKAO_COORD.lat,
          DEFAULT_KAKAO_COORD.lng
        )
        alert('현재 위치 정보가 없습니다. 기본 위치로 이동합니다.')
      }
      mapApi.setCenter(locPosition)
      searchStore(SearchType.CATEGORY, mapApi)
    }
  }

  const searchFromHereHandler = () => {
    removeMarkerNInfo()
    if (mapApi) {
      searchStore(SearchType.CATEGORY, mapApi)
    }
  }

  return (
    <MapWrap>
      <Map />
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
    </MapWrap>
  )
}

export default MapContainer
