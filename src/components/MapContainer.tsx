// import { MapData } from '@stores/map/mapType'
import React, { useEffect } from 'react'
// import useScript from 'react-script-hook'
interface MapPropsType {
  keyword: string
}

// head에 작성한 Kakao API 불러오기
const { kakao } = window

const MapContainer: React.FC<MapPropsType> = ({ keyword }) => {
  // 검색어가 바뀔 때마다 재렌더링되도록 useEffect 사용
  useEffect(() => {
    const mapContainer = document.getElementById('map') as HTMLDivElement
    // 카카오가 undefined인지 체크 코드 필요
    const mapOption = {
      center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }
    // 지도를 생성
    const map = new kakao.maps.Map(mapContainer, mapOption)

    // 지도가 이동, 확대, 축소로 인해 중심좌표가 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'center_changed', function () {
      // 지도의  레벨을 얻어옵니다
      const level = map.getLevel()

      // 지도의 중심좌표를 얻어옵니다
      //   const latlng = map.getCenter()

      const lat = map.getCenter().getLat()

      const lng = map.getCenter().getLng()

      let message = `<p>지도 레벨은${+level}이고</p>`
      message += `<p>중심 좌표는 위도 ${+lat} / 경도 ${+lng}입니다</p>`

      const resultDiv = document.getElementById('result') as HTMLDivElement
      resultDiv.innerHTML = message
    })

    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 })

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places()

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(`${keyword} 편의점`, placesSearchCB)

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(
      data: kakao.maps.services.PlacesSearchResult,
      status: kakao.maps.services.Status
    ) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(+data[i].y, +data[i].x))
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      } else {
        console.log('error')
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: kakao.maps.services.PlacesSearchResultItem) {
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
  }, [keyword])

  return (
    <div className="map-container">
      <div
        id="map"
        className="map"
        style={{ width: '100%', height: '500px', margin: '50px' }}
      ></div>
      <p id="result"></p>
    </div>
  )
}

export default MapContainer
