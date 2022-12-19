import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from 'react'
import { useAppDispatch } from '@stores/store'

import { getData, removeData } from '@stores/map/mapSlice'
import KakaoServie from '@services/kakaoService'
import { MapContext } from '@context/MapContext'

import Map from '@components/Map/Map'

import { MapWrap, ControlBtns } from './MapContainer.styles'

interface MapPropsType {
  keyword: string
}
// 카카오 서치 함수 구분용 타입
enum SearchType {
  KEYWORD = 'KEYWORD',
  CATEGORY = 'CATEGORY',
}

const MapContainer: React.FC<MapPropsType> = ({ keyword }) => {
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
        // mapData dispatch -> 나중에 서버와 연결한 데이터를 받아올 action
        dispatch(getData(data))
        // 위에꺼 말고 서버와 통신해서 편의점 정보 받아올 액션
        // const storeIds = data.map((result) => result.id)
        // dispatch(fetchAllStores(storeIds))
        // 새로 지도의 영역 설정
        const bounds = new kakao.maps.LatLngBounds()
        for (let i = 0; i < data.length; i++) {
          const marker = KakaoServie.displayMarkerInfoWindow(data[i], map)
          setMarkers(marker)
          bounds.extend(new kakao.maps.LatLng(+data[i].y, +data[i].x))
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      } else {
        dispatch(removeData())
        console.log(`error ${status}`)
      }
    },
    [dispatch, setMarkers]
  )

  // 검색 함수 kakao map을 인자로 받아와 작동한다.
  const searchStore = useCallback(
    (searchType: SearchType, searchTerm: string, mapApi: kakao.maps.Map) => {
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

      const myMarker = KakaoServie.displayMyLocation(map, center)
      setMarkers(myMarker)
      searchStore(SearchType.CATEGORY, '', map)
    },
    [searchStore, setMarkers, setMapApi]
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
        // 받아온 좌표로 지도 center 값 셋팅
        const center = new kakao.maps.LatLng(lat, lng)
        drawMap(center)
      },
      (positionError) => {
        alert(
          `좌표를 가져오지 못했습니다. 기본위치에서 시작합니다. ${positionError.message}`
        )
        const center = new kakao.maps.LatLng(myPosition.lat, myPosition.lng)
        drawMap(center)
      }
    )
  }, [drawMap, myPosition.lat, myPosition.lng])

  // 기존에 생성한 마커가 있을 시 마커와 인포윈도우를 지우는 함수
  const removeMarkerNInfo = useCallback(() => {
    KakaoServie.infoWindow.close()
    deleteMarkers()
  }, [deleteMarkers])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    if (mapApi instanceof kakao.maps.Map) {
      if (keyword.length !== 0) {
        removeMarkerNInfo()
        searchStore(SearchType.KEYWORD, keyword, mapApi)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapApi, keyword, searchStore])

  //  지도를 사용자의 위치로 이동하는 함수
  const moveToCenter = () => {
    removeMarkerNInfo()
    // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    const locPosition = new kakao.maps.LatLng(myPosition.lat, myPosition.lng)

    if (mapApi) {
      const myMarker = KakaoServie.displayMyLocation(mapApi, locPosition)
      setMarkers(myMarker)
      searchStore(SearchType.CATEGORY, '', mapApi)
    }
  }

  const searchFromHereHandler = () => {
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
