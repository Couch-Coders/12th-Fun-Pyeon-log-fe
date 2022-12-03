import React, { useEffect, useRef, useState } from 'react'
import { Result } from './Result'
import { useAppDispatch } from '@stores/store'
import { getData } from '@stores/map/mapSlice'
import styled from 'styled-components'
import { displayMarker, displayMe, kakao } from '@services/kakao'

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

const MapContainer: React.FC<MapPropsType> = ({ keyword }) => {
  const dispatch = useAppDispatch()
  // const [keywordValue, setKeywordValue] = useState<string>(keyword)
  const [mapApi, setMapApi] = useState<kakao.maps.Map | null>(null)
  const [mapValue, setMapValue] = useState<ResultPropsType>({
    level: 3,
    lat: 37.54699,
    lng: 127.09598,
  })

  const mapRef = useRef<HTMLDivElement | null>(null)
  // 장소 검색 객체를 생성합니다

  const coordSuccess = (position: GeolocationPosition) => {
    const lat = position.coords.latitude // 위도
    const lon = position.coords.longitude // 경도
    setMapValue((preState) => {
      return {
        ...preState,
        lat,
        lng: lon,
      }
    })
    const locPosition = new kakao.maps.LatLng(lat, lon) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    const message = '<div style="padding:5px;">여기에 계신가요?!</div>' // 인포윈도우에 표시될 내용입니다
    if (mapApi) {
      displayMe(mapApi, locPosition, message)
      searchKeywordFunction(`${keyword} 편의점`, mapApi, locPosition)
    }
  }

  const coordError = () => {
    const locPosition = new kakao.maps.LatLng(mapValue.lat, mapValue.lng)
    const message = 'geolocation을 사용할수 없어요..'
    if (mapApi) displayMe(mapApi, locPosition, message)
  }

  const moveToCenter = () => {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(
      coordSuccess,
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      coordError
    )
  }

  useEffect(() => {
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
  }, [])

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    search(keyword)
  }, [mapApi, keyword])

  // 검색 함수
  const search = (searchTerm: string) => {
    if (mapApi) {
      // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(mapApi, 'center_changed', function () {
        // 지도의  레벨을 얻어옵니다
        const level = mapApi.getLevel()

        // 지도의 중심좌표를 얻어옵니다
        const lat = mapApi.getCenter().getLat()
        const lng = mapApi.getCenter().getLng()
        setMapValue({ level, lat, lng })
      })
      searchKeywordFunction(`${searchTerm} 편의점`, mapApi)
    }
  }

  const searchOption = {
    location: new kakao.maps.LatLng(mapValue.lat, mapValue.lng),
    sort: kakao.maps.services.SortBy.DISTANCE,
  }

  const searchKeywordFunction = (
    keyword: string,
    map: kakao.maps.Map,
    locPosition?: kakao.maps.LatLng
  ) => {
    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          dispatch(getData(data))
          const bounds = new kakao.maps.LatLngBounds()

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i], map)
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
      },
      searchOption
    )
  }

  // 지도 생성 함수
  const drawMap = (center: kakao.maps.LatLng) => {
    // 지도 초기화
    if (mapRef.current) mapRef.current.innerHTML = ''

    const mapContainer = document.getElementById('map') as HTMLDivElement
    const mapOption = {
      center, // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }
    const map = new kakao.maps.Map(mapContainer, mapOption)
    setMapApi(map)
  }

  return (
    <MapCon>
      <div id="map" className="map" ref={mapRef}></div>
      <Result level={mapValue.level} lat={mapValue.lat} lng={mapValue.lng} />

      <Button
        onClick={() => {
          search('')
        }}
        className="search_Btn"
      >
        이 위치에서 다시 검색
      </Button>
      <Button onClick={moveToCenter} className="myGps_Btn">
        내위치로 이동
      </Button>
    </MapCon>
  )
}

export default MapContainer
