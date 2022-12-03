// import { MapData } from '@stores/map/mapType'
import React, { useEffect, useRef, useState } from 'react'
import { Result } from './Result'
import { useAppDispatch } from '@stores/store'
import { getData } from '@stores/map/mapSlice'
import styled from 'styled-components'
// import useScript from 'react-script-hook'

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

// head에 작성한 Kakao API 불러오기
const { kakao } = window

const MapContainer: React.FC<MapPropsType> = ({ keyword }) => {
  // const MapContainer = () => {
  const dispatch = useAppDispatch()
  const [mapApi, setMapApi] = useState<kakao.maps.Map | null>(null)
  const [mapValue, setMapValue] = useState<ResultPropsType>({
    level: 3,
    lat: 37.54699,
    lng: 127.09598,
  })
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getMyGps()
  }, [])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    search()
  }, [mapApi, keyword])

  const searchOption = {
    location: new kakao.maps.LatLng(mapValue.lat, mapValue.lng),
    radius: 1000,
    sort: kakao.maps.services.SortBy.DISTANCE,
  }

  // 검색 함수
  const search = () => {
    if (mapApi) {
      // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(mapApi, 'center_changed', function () {
        // 지도의  레벨을 얻어옵니다
        const level = mapApi.getLevel()

        // 지도의 중심좌표를 얻어옵니다
        //   const latlng = map.getCenter()
        const lat = mapApi.getCenter().getLat()
        const lng = mapApi.getCenter().getLng()
        setMapValue({ level, lat, lng })
        console.log(mapValue.lat, mapValue.lng)
      })

      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places()

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(
        `${keyword} 편의점`,
        (data, status) => placesSearchCB(data, status, mapApi, infowindow),
        searchOption
      )
    }
  }

  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(
    data: kakao.maps.services.PlacesSearchResult,
    status: kakao.maps.services.Status,
    map: kakao.maps.Map,
    infowindow: kakao.maps.InfoWindow
  ) {
    if (status === kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      const bounds = new kakao.maps.LatLngBounds()

      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i], map, infowindow)
        bounds.extend(new kakao.maps.LatLng(+data[i].y, +data[i].x))
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds)

      // mapData dispatch
      dispatch(getData(data))
      console.log('검색 완료')
    } else {
      dispatch(getData([]))
      console.log('error')
    }
  }

  // 지도에 마커를 표시하는 함수입니다
  function displayMarker(
    place: kakao.maps.services.PlacesSearchResultItem,
    map: kakao.maps.Map,
    infowindow: kakao.maps.InfoWindow
  ) {
    // 마커를 생성하고 지도에 표시합니다
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(+place.y, +place.x),
    })

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(marker, 'click', function () {
      const name = String(place.place_name)

      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent(
        `<div style="padding:5px;font-size:12px;">${name}</div>`
      )
      infowindow.open(map, marker)
    })
  }

  // 지도에 마커와 인포윈도우를 표시하는 함수입니다
  function displayMe(
    map: kakao.maps.Map,
    locPosition: kakao.maps.LatLng,
    message: string
  ) {
    // 마커를 생성합니다
    const marker = new kakao.maps.Marker({
      map,
      position: locPosition,
    })

    const iwContent = message // 인포윈도우에 표시할 내용
    const iwRemoveable = true

    // 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    })

    // 인포윈도우를 마커위에 표시합니다
    infowindow.open(map, marker)

    // 지도 중심좌표를 접속위치로 변경합니다
    map.setCenter(locPosition)
    map.setLevel(3, { animate: true })
  }

  // 내 위치로 이동 함수
  const moveToCenter = () => {
    if (mapApi) {
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
      if (navigator.geolocation) {
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude // 위도
          const lng = position.coords.longitude // 경도

          setMapValue({ level: 3, lat, lng })

          const locPosition = new kakao.maps.LatLng(lat, lng) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
          const message = '<div style="padding:5px;">현 위치</div>' // 인포윈도우에 표시될 내용입니다

          displayMe(mapApi, locPosition, message)
        })
      } else {
        // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        const locPosition = new kakao.maps.LatLng(mapValue.lat, mapValue.lng)
        const message = 'geolocation을 사용할수 없어요..'

        displayMe(mapApi, locPosition, message)
      }
    }
  }

  // 내 위치에서 지도 생성
  const getMyGps = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude // 위도
          const lng = position.coords.longitude // 경도

          const center = new kakao.maps.LatLng(lat, lng)
          setMapValue({ level: 3, lat, lng })
          drawMap(center)
        },
        function () {
          const center = new kakao.maps.LatLng(mapValue.lat, mapValue.lng)
          drawMap(center)
        }
      )
    }
  }

  // 지도 생성 함수
  const drawMap = (center: kakao.maps.LatLng) => {
    // 지도 초기화
    mapRef.current.innerHTML = ''

    const mapContainer = document.getElementById('map') as HTMLDivElement
    const mapOption = {
      center, // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }
    const map = new kakao.maps.Map(mapContainer, mapOption)
    setMapApi(map)
  }

  return (
    <MapCon className="map-container">
      <div
        id="map"
        className="map"
        style={{ width: '100%', height: '80vh' }}
      ></div>
      <Result level={mapValue.level} lat={mapValue.lat} lng={mapValue.lng} />

      <Button onClick={search} className="search_Btn">
        이 위치에서 다시 검색
      </Button>
      <Button onClick={moveToCenter} className="myGps_Btn">
        내위치로 이동
      </Button>
    </MapCon>
  )
}

export default MapContainer
