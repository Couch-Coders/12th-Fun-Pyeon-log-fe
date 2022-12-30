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
enum SearchType {
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

  // 위 서치로 받아온 data를 다루는 콜백함수
  const searchCallBack = useCallback(
    (
      data: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status,
      map: kakao.maps.Map,
      searchType: SearchType
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        // 새로 지도의 영역 설정
        const bounds = new kakao.maps.LatLngBounds()
        for (let i = 0; i < data.length; i++) {
          bounds.extend(
            new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x))
          )
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        if (searchType === SearchType.KEYWORD) {
          map.setBounds(bounds)
        }
        // 센터 찾아서 가운데 위치 찾고 마커 표시
        const newLatLan = map.getCenter()
        const myMarker = KakaoService.displayMyLocation(map, newLatLan)
        addMarkers(myMarker)
        dispatch(
          setSearchedCoord({ lat: newLatLan.getLat(), lng: newLatLan.getLng() })
        )
        dispatch(fetchAllStores({ mapData: data, map }))
      } else {
        console.log(`error ${status}`)
      }
    },

    [dispatch, addMarkers]
  )

  // 검색 함수 kakao map을 인자로 받아와 작동한다.
  const searchStore = useCallback(
    (searchType: SearchType, searchTerm: string, mapApi: kakao.maps.Map) => {
      // 펼쳐진 오버레이 삭제
      KakaoService.overlay.setMap(null)
      const ps = new kakao.maps.services.Places()
      // if문으로
      if (searchType === SearchType.KEYWORD) {
        //  키워드 서치 기능
        ps.keywordSearch(`${searchTerm} 편의점`, (data, status) =>
          searchCallBack(data, status, mapApi, searchType)
        )
      } else {
        //  카테고리 서치 기능
        ps.categorySearch(
          'CS2',
          (data, status) => searchCallBack(data, status, mapApi, searchType),
          //  카테고리 서치 옵션
          {
            location: mapApi.getCenter(),
            sort: kakao.maps.services.SortBy.DISTANCE,
            useMapBounds: true,
          }
        )
      }
    },
    [searchCallBack]
  )

  // 처음 들어왔을 때
  useEffect(() => {
    dispatch(saveSearchWord(''))
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
          searchStore(SearchType.CATEGORY, '', mapApi)
        },
        () => {
          if (!searchedCoord) {
            alert('위치동의를 하지 않아서 기본위치에서 시작합니다.')
            // searchStore(SearchType.CATEGORY, '', mapApi)
            // return
          }
          // const center = new kakao.maps.LatLng(
          //   searchedCoord.lat,
          //   searchedCoord.lng
          // )
          // mapApi.setCenter(center)
          searchStore(SearchType.CATEGORY, '', mapApi)
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
        searchStore(SearchType.KEYWORD, searchWord, mapApi)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapApi, searchWord, searchStore])

  //  지도를 사용자의 위치로 이동하는 함수
  const moveToCenter = () => {
    dispatch(saveSearchWord(''))
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
      searchStore(SearchType.CATEGORY, '', mapApi)
    }
  }

  const searchFromHereHandler = () => {
    dispatch(saveSearchWord(''))
    removeMarkerNInfo()
    if (mapApi) {
      searchStore(SearchType.CATEGORY, '', mapApi)
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
