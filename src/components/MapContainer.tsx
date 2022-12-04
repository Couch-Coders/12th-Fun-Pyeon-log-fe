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
  const [myPosition, setMyPosition] = useState<{ lat: number; lng: number }>({
    lat: 37.54699,
    lng: 127.09598,
  })
  const [mapApi, setMapApi] = useState<kakao.maps.Map | null>(null)
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([])
  // 좌표값을 보기위한 임시 useState
  const [mapValue, setMapValue] = useState<ResultPropsType>({
    level: 3,
    lat: 37.54699,
    lng: 127.09598,
  })

  const mapRef = useRef<HTMLDivElement | null>(null)

  const moveToCenter = () => {
    const locPosition = new kakao.maps.LatLng(myPosition.lat, myPosition.lng) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
    const message = '<div style="padding:5px;">여기에 계신가요?!</div>' // 인포윈도우에 표시될 내용입니다
    if (mapApi) {
      displayMe(mapApi, locPosition, message)
      searchKeywordFunction(`${keyword} 편의점`, mapApi, locPosition)
    }
  }

  useEffect(() => {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude // 위도
        const lng = position.coords.longitude // 경도
        setMyPosition((prev) => {
          return { ...prev, lat, lng }
        })
        setMapValue((prev) => {
          return { ...prev, level: 3, lat, lng }
        })

        const center = new kakao.maps.LatLng(lat, lng)

        drawMap(center)
      },
      function (positionError) {
        alert(
          `좌표를 가져오지 못했습니다. 기본위치에서 시작합니다. ${positionError.message}  `
        )
        const center = new kakao.maps.LatLng(mapValue.lat, mapValue.lng)
        drawMap(center)
      }
    )
  }, [])

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

  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    if (mapApi) {
      kakao.maps.event.addListener(mapApi, 'center_changed', function () {
        // 지도의  레벨을 얻어옵니다
        const level = mapApi.getLevel()

        // 지도의 중심좌표를 얻어옵니다
        const lat = mapApi.getCenter().getLat()
        const lng = mapApi.getCenter().getLng()
        setMapValue((prevState) => {
          return { ...prevState, level, lat, lng }
        })
      })
      search(keyword)
    }
  }, [mapApi, keyword])

  // 검색 함수
  const search = (searchTerm: string) => {
    if (mapApi) {
      // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      searchKeywordFunction(
        `${searchTerm} 편의점`,
        mapApi,
        new kakao.maps.LatLng(mapValue.lat, mapValue.lng)
      )
    }
  }

  const searchKeywordFunction = (
    keyword: string,
    map: kakao.maps.Map,
    locPosition: kakao.maps.LatLng
  ) => {
    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(
      keyword,
      (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          removeMarker()
          // mapData dispatch
          dispatch(getData(data))
          const bounds = new kakao.maps.LatLngBounds()
          // displayMarker(data, map)

          for (let i = 0; i < data.length; i++) {
            const marker = new kakao.maps.Marker({
              map,
              position: new kakao.maps.LatLng(+data[i].y, +data[i].x),
            })

            setMarkers((prevState) => {
              return [...prevState, marker]
            })

            displayMarker(data[i], map, marker)

            bounds.extend(new kakao.maps.LatLng(+data[i].y, +data[i].x))
          }

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds)
          map.setLevel(mapValue.level)
          console.log('검색 완료')
        } else {
          dispatch(getData([]))
          console.log('error')
        }
      },
      {
        location: locPosition,
        sort: kakao.maps.services.SortBy.DISTANCE,
        useMapBounds: true,
      }
    )
  }
  const removeMarker = () => {
    markers.forEach((marker) => marker.setMap(null))
    setMarkers([])
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
