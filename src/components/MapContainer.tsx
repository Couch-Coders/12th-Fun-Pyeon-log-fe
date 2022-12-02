// import { MapData } from '@stores/map/mapType'
import React, { useEffect, useState } from 'react'
import { Result } from './Result'
import { useAppDispatch } from '@stores/store'
import { getData } from '@stores/map/mapSlice'
import styled from 'styled-components'
// import useScript from 'react-script-hook'

const MapCon = styled.div`
  width: 100%;

  .map {
    width: 100%;
    height: 100vh;
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

  useEffect(() => {
    const mapContainer = document.getElementById('map') as HTMLDivElement
    // 카카오가 undefined인지 체크 코드 필요
    const mapOption = {
      center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }
    // 지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOption)
    setMapApi(map)
  }, [])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
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
      })

      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places()

      // 키워드로 장소를 검색합니다
      ps.keywordSearch(`${keyword} 편의점`, (data, status) =>
        placesSearchCB(data, status, mapApi, infowindow)
      )
    }
  }, [mapApi, keyword])

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
    } else {
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

  return (
    <MapCon className="map-container">
      <div id="map" className="map"></div>
      <Result level={mapValue.level} lat={mapValue.lat} lng={mapValue.lng} />
    </MapCon>
  )
}

export default MapContainer
