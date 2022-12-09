export const { kakao } = window
export const infoWindow = new kakao.maps.InfoWindow({
  zIndex: 1,
  removable: true,
})
// 사용자 이미지 마커를 불러옵니다.
export const myMarkerImg = new kakao.maps.MarkerImage(
  'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
  new kakao.maps.Size(31, 35)
)

// 지도에 마커를 표시하는 함수입니다
export const displayMarkerInfoWindow = (
  data: kakao.maps.services.PlacesSearchResultItem,
  map: kakao.maps.Map
) => {
  // 마커를 생성하고 지도에 표시합니다
  const marker = new kakao.maps.Marker({
    map,
    position: new kakao.maps.LatLng(+data.y, +data.x),
  })
  const name = String(data.place_name)
  const content = `<div style="padding:5px;font-size:12px;">${name}</div>`

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function () {
    infoWindow.setContent(content)
    infoWindow.open(map, marker)
  })
  return marker
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
export const displayMe = (
  map: kakao.maps.Map,
  locPosition: kakao.maps.LatLng
) => {
  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    map,
    position: locPosition,
    image: myMarkerImg,
  })
  const message = '<div style="padding:5px;">현위치</div>' // 인포윈도우에 표시될 내용입니다
  infoWindow.setContent(message)
  infoWindow.open(map, marker)

  kakao.maps.event.addListener(marker, 'click', function () {
    // 인포윈도우를 마커위에 표시합니다
    infoWindow.open(map, marker)
  })
  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition)
  // map.setLevel(3, { animate: true })
  return marker
}
