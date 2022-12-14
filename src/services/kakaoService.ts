import { customMarkerImage, CUSTOM_MARKER_CLASS } from './markerImg'

const { kakao } = window
const infoWindow = new kakao.maps.InfoWindow({
  zIndex: 1,
})

const overlay = new kakao.maps.CustomOverlay({
  position: new kakao.maps.LatLng(37.54699, 127.09598),
})

// 마커 이미지 선택기
const getMarkerImg = (placeName: string) =>
  ({
    [CUSTOM_MARKER_CLASS.gs]: customMarkerImage.gsMarkerImg,
    [CUSTOM_MARKER_CLASS.cu]: customMarkerImage.cuMarkerImg,
    [CUSTOM_MARKER_CLASS.mini]: customMarkerImage.miniMarkerImg,
    [CUSTOM_MARKER_CLASS.seven]: customMarkerImage.sevenMarkerImg,
    [CUSTOM_MARKER_CLASS.emart]: customMarkerImage.emartMarkerImg,
  }[placeName])

// 지도에 마커를 표시하는 함수입니다
const displayMarkerInfoWindow = (
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
const displayMyLocation = (
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

const kakaoServie = {
  displayMarkerInfoWindow,
  displayMyLocation,
  infoWindow,
  kakao,
}

export default kakaoServie
