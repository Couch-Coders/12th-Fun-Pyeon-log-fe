import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react'
import { useSelector } from 'react-redux'
import { setSearchedCoord, saveSearchWord } from '@stores/sort/sortSlice'
import { RootState, useAppDispatch } from '@stores/store'
import KakaoService from '@services/kakaoService'
import { MapContext } from '@context/MapContext'
import { fetchAllStores } from '@stores/conv/convSlice'
import Map from '@components/Map/Map'
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
  const { setMapApi, setMarkers, deleteMarkers, mapApi } =
    useContext(MapContext)
  const mapRef = useRef<HTMLDivElement | null>(null)
  // 사용자 좌표 저장
  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({
    lat: 37.54699,
    lng: 127.09598,
  })

  // 위 서치로 받아온 data를 다루는 콜백함수
  const searchCallBack = useCallback(
    (
      data: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status,
      map: kakao.maps.Map
    ) => {
      if (status === kakao.maps.services.Status.OK) {
        // 새로 지도의 영역 설정
        const bounds = new kakao.maps.LatLngBounds()
        for (let i = 0; i < data.length; i++) {
          const marker = KakaoService.displayMarkerOverlay(data[i], map)
          setMarkers(marker)
          bounds.extend(
            new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x))
          )
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)

        // 센터 찾아서 가운데 위치 찾고 마커 표시
        const newLatLan = map.getCenter()
        const myMarker = KakaoService.displayMyLocation(map, newLatLan)
        setMarkers(myMarker)

        dispatch(fetchAllStores({ mapData: data, map }))
      } else {
        console.log(`error ${status}`)
      }
    },
    []
  )

  // 검색 함수 kakao map을 인자로 받아와 작동한다.
  const searchStore = useCallback(
    (searchType: SearchType, searchTerm: string, mapApi: kakao.maps.Map) => {
      // 펼쳐진 오버레이 삭제
      KakaoService.overlay.setMap(null)

      const ps = new kakao.maps.services.Places()
      const lat = mapApi.getCenter().getLat()
      const lng = mapApi.getCenter().getLng()

      // if문으로
      if (searchType === SearchType.KEYWORD) {
        //  키워드 서치 기능
        ps.keywordSearch(`${searchTerm} 편의점`, (data, status) =>
          searchCallBack(data, status, mapApi)
        )
      } else {
        dispatch(setSearchedCoord({ lat, lng }))
        //  카테고리 서치 기능
        ps.categorySearch(
          'CS2',
          (data, status) => searchCallBack(data, status, mapApi),
          //  카테고리 서치 옵션
          {
            location: new kakao.maps.LatLng(lat, lng),
            sort: kakao.maps.services.SortBy.DISTANCE,
            useMapBounds: true,
          }
        )
      }
    },
    [searchCallBack]
  )

  // 지도 생성 함수
  const drawMap = useCallback(
    (center: kakao.maps.LatLng) => {
      // 지도 초기화
      if (mapRef.current) mapRef.current.innerHTML = ''
      const mapContainer = mapRef.current as HTMLDivElement
      const mapOption = {
        center, // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      }
      const map = new kakao.maps.Map(mapContainer, mapOption)
      setMapApi(map)
      searchStore(SearchType.CATEGORY, '', map)
    },
    [setMapApi, searchStore]
  )

  // 처음 들어왔을 때
  useEffect(() => {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude // 위도
        const lng = position.coords.longitude // 경도
        setMyPosition((prev) => ({ ...prev, lat, lng }))
        if (searchedCoord) {
          if (mapRef.current) mapRef.current.innerHTML = ''
          const mapContainer = mapRef.current as HTMLDivElement
          const center = new kakao.maps.LatLng(
            searchedCoord.lat,
            searchedCoord.lng
          )
          const mapOption = {
            center,
            level: 4,
          }
          const map = new kakao.maps.Map(mapContainer, mapOption)
          setMapApi(map)
        } else {
          // 받아온 좌표로 지도 center 값 셋팅
          const center = new kakao.maps.LatLng(lat, lng)
          drawMap(center)
          dispatch(setSearchedCoord({ lat, lng }))
        }
      },
      (positionError) => {
        alert(
          `좌표를 가져오지 못했습니다. 기본위치에서 시작합니다. ${positionError.message}`
        )
        const center = new kakao.maps.LatLng(myPosition.lat, myPosition.lng)
        drawMap(center)
        dispatch(setSearchedCoord({ lat: myPosition.lat, lng: myPosition.lng }))
      }
    )
  }, [])

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
      } else if (searchWord.length === 0 && searchedCoord) {
        removeMarkerNInfo()
        const locPosition = new kakao.maps.LatLng(
          searchedCoord.lat,
          searchedCoord.lng
        )
        mapApi.setCenter(locPosition)
        searchStore(SearchType.CATEGORY, '', mapApi)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapApi, searchWord, searchStore])

  //  지도를 사용자의 위치로 이동하는 함수
  const moveToCenter = () => {
    dispatch(saveSearchWord(''))
    removeMarkerNInfo()
    // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    const locPosition = new kakao.maps.LatLng(myPosition.lat, myPosition.lng)

    if (mapApi) {
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
      <Map ref={mapRef} />
      <ControlBtns>
        <button onClick={searchFromHereHandler} className="search_Btn">
          이 위치에서 다시 검색
        </button>
        <button onClick={moveToCenter} className="myGps_Btn">
          내위치로 이동
        </button>
      </ControlBtns>
    </MapWrap>
  )
}

export default MapContainer
