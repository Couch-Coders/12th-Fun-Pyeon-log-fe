import React, { useEffect, useRef, useState } from 'react'

import { useAppDispatch } from '@stores/store'
import { getData, removeData } from '@stores/map/mapSlice'
import styled from 'styled-components'
import {
  displayMarkerInfoWindow,
  displayMe,
  infoWindow,
  kakao,
} from '@services/kakao'

const MapCon = styled.div`
  position: relative;
  width: 100%;
  .map {
    width: 100%;
    height: calc(100vh - 80px);
  }
`

const Button = styled.button`
  background-color: #fff;
  color: #222;
  border-radius: 10px;
  opacity: 0.7;
  position: absolute;
  top: 10px;
  z-index: 5;
  transition: 0.5s;
  padding: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &.myGps_Btn {
    right: 10px;
  }

  &.search_Btn {
    left: 50%;
  }
`

interface MapPropsType {
  keyword: string
}

export interface ResultPropsType {
  level: number
  lat: number
  lng: number
}

enum SearchType {
  KEYWORD = 'KEYWORD',
  CATEGORY = 'CATEGORY',
}

const MapContainer: React.FC<MapPropsType> = ({ keyword }) => {
  const dispatch = useAppDispatch()
  const mapRef = useRef<HTMLDivElement | null>(null)

  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({
    lat: 37.54699,
    lng: 127.09598,
  })
  const [mapApi, setMapApi] = useState<kakao.maps.Map | null>(null)
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([])

  const moveToCenter = () => {
    removeMarkerNInfo()
    const locPosition = new kakao.maps.LatLng(myPosition.lat, myPosition.lng) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

    if (mapApi) {
      const myMaker = displayMe(mapApi, locPosition)
      setMarkers((prevState) => {
        return [...prevState, myMaker]
      })
      searchStore(SearchType.CATEGORY, '', mapApi)
    }
  }

  useEffect(() => {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude // 위도
          const lng = position.coords.longitude // 경도
          setMyPosition((prev) => {
            return { ...prev, lat, lng }
          })
          const center = new kakao.maps.LatLng(lat, lng)
          drawMap(center)
        },
        function (positionError) {
          alert(
            `좌표를 가져오지 못했습니다. 기본위치에서 시작합니다. ${positionError.message}  `
          )
          const center = new kakao.maps.LatLng(myPosition.lat, myPosition.lng)
          drawMap(center)
        }
      )
    }
  }, [])

  // 지도 생성 함수
  const drawMap = (center: kakao.maps.LatLng) => {
    // 지도 초기화
    if (mapRef.current) mapRef.current.innerHTML = ''
    const mapContainer = mapRef.current as HTMLDivElement

    const mapOption = {
      center, // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    }
    const map = new kakao.maps.Map(mapContainer, mapOption)
    setMapApi(map)

    const myMaker = displayMe(map, center)
    setMarkers((prevState) => {
      return [...prevState, myMaker]
    })
    searchStore(SearchType.CATEGORY, '', map)
  }

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    if (mapApi instanceof kakao.maps.Map) {
      if (keyword.length !== 0) {
        removeMarkerNInfo()
        searchStore(SearchType.KEYWORD, keyword, mapApi)
      }
    }
  }, [mapApi, keyword])

  // 검색 함수 map api 를 인자로 받아와 작동한다.
  const searchStore = (
    searchType: SearchType,
    searchTerm: string,
    mapApi: kakao.maps.Map
  ) => {
    const ps = new kakao.maps.services.Places()
    const lat = mapApi.getCenter().getLat()
    const lng = mapApi.getCenter().getLng()

    switch (searchType) {
      case SearchType.KEYWORD:
        ps.keywordSearch(`${searchTerm} 편의점`, (data, status) =>
          searchCallBack(data, status, mapApi)
        )
        break
      case SearchType.CATEGORY:
        ps.categorySearch(
          'CS2',
          (data, status) => searchCallBack(data, status, mapApi),
          {
            location: new kakao.maps.LatLng(lat, lng),
            sort: kakao.maps.services.SortBy.DISTANCE,
            useMapBounds: true,
          }
        )
        break
      default:
        alert('KEYWORD ERROR - NO valid keyword')
    }
  }

  const searchCallBack = (
    data: kakao.maps.services.PlacesSearchResult,
    status: kakao.maps.services.Status,
    map: kakao.maps.Map
  ) => {
    if (status === kakao.maps.services.Status.OK) {
      // mapData dispatch -> 나중에 서버와 연결한 데이터를 받아올 action
      dispatch(getData(data))
      const bounds = new kakao.maps.LatLngBounds()
      for (let i = 0; i < data.length; i++) {
        const marker = displayMarkerInfoWindow(data[i], map)
        setMarkers((prevState) => {
          return [...prevState, marker]
        })
        bounds.extend(new kakao.maps.LatLng(+data[i].y, +data[i].x))
      }
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds)
    } else {
      dispatch(removeData())
      console.log(`error ${status}`)
    }
  }

  const removeMarkerNInfo = () => {
    if (markers.length >= 1) {
      markers.forEach((markerInfo) => {
        markerInfo.setMap(null)
      })
      infoWindow.close()
      setMarkers([])
    }
  }

  const searchFromHereHandler = () => {
    removeMarkerNInfo()
    if (mapApi) {
      searchStore(SearchType.CATEGORY, '', mapApi)
    }
  }

  return (
    <MapCon>
      <div id="map" className="map" ref={mapRef}></div>
      <Button onClick={searchFromHereHandler} className="search_Btn">
        이 위치에서 다시 검색
      </Button>
      <Button onClick={moveToCenter} className="myGps_Btn">
        내위치로 이동
      </Button>
    </MapCon>
  )
}

export default MapContainer
