import { SearchType } from '@components/MapContainer/MapContainer'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { customMarkerImage, getMarkerImg } from './markerImg'

const { kakao } = window
const placeSearch = new kakao.maps.services.Places()
const overlay = new kakao.maps.CustomOverlay({
  position: new kakao.maps.LatLng(
    DEFAULT_KAKAO_COORD.lat,
    DEFAULT_KAKAO_COORD.lng
  ),
  zIndex: 1,
})

const infoOverlay = new kakao.maps.CustomOverlay({
  position: new kakao.maps.LatLng(
    DEFAULT_KAKAO_COORD.lat,
    DEFAULT_KAKAO_COORD.lng
  ),
  zIndex: 1,
})

const searchCallBack = (
  data: kakao.maps.services.PlacesSearchResult,
  map: kakao.maps.Map,
  searchType: SearchType
) => {
  if (searchType === SearchType.KEYWORD) {
    // 새로 지도의 영역 설정
    const bounds = new kakao.maps.LatLngBounds()
    for (let i = 0; i < data.length; i++) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      bounds.extend(new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x)))
    }
    map.setBounds(bounds)
  }
  // 센터 찾아서 가운데 위치 찾고 마커 표시
  const newLatLng = map.getCenter()
  const myMarker = KakaoService.displayMyLocation(map, newLatLng)
  return { myMarker, lat: newLatLng.getLat(), lng: newLatLng.getLng() }
}

// 지도에 마커와 인포윈도우를 표시하는 함수입니다
const displayMyLocation = (
  map: kakao.maps.Map,
  locPosition: kakao.maps.LatLng,
  storeBrand?: string
) => {
  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    map,
    position: locPosition,
    image:
      storeBrand && storeBrand.length > 0
        ? getMarkerImg(storeBrand) ?? customMarkerImage.funMarkerImg
        : customMarkerImage.myMarkerImg,
  })

  const content = `<div class="infoOverlay ${storeBrand ? ' ' : 'me'}">${
    storeBrand ? ' ' : 'YOU'
  }</div>`
  overlay.setContent(content)
  overlay.setPosition(locPosition)
  overlay.setMap(map)

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition)

  return marker
}

const searchOneStore = (storeName: string, storeId: string) => {
  const store: kakao.maps.services.PlacesSearchResult = []
  placeSearch.keywordSearch(`${storeName} 편의점`, (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const searchedstore = data.filter((store) => store.id === storeId)
      store.push(...searchedstore)
    }
  })

  return store
}

const KakaoService = {
  displayMyLocation,
  searchOneStore,
  searchCallBack,
  kakao,
  placeSearch,
  overlay,
  infoOverlay,
}

export default KakaoService
