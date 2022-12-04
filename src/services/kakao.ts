export const { kakao } = window

// 지도에 마커를 표시하는 함수입니다
export const displayMarker = (
  data: kakao.maps.services.PlacesSearchResultItem,
  map: kakao.maps.Map,
  marker: kakao.maps.Marker
) => {
  // 마커를 생성하고 지도에 표시합니다
  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function () {
    const name = String(data.place_name)
    const content = `<div style="padding:5px;font-size:12px;">${name}</div>`
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    const infoWindow = new kakao.maps.InfoWindow({
      content,
      removable: true,
    })
    infoWindow.open(map, marker)
  })
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
export const displayMe = (
  map: kakao.maps.Map,
  locPosition: kakao.maps.LatLng,
  message: string
) => {
  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    map,
    position: locPosition,
  })
  kakao.maps.event.addListener(marker, 'click', function () {
    // 인포윈도우를 생성합니다
    const infoWindow = new kakao.maps.InfoWindow({
      content: message,
      removable: true,
    })
    // 인포윈도우를 마커위에 표시합니다
    infoWindow.open(map, marker)
  })
  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition)
  map.setLevel(3, { animate: true })
}
