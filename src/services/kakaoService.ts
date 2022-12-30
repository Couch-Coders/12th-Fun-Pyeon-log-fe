import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { customMarkerImage, getMarkerImg } from './markerImg'

const { kakao } = window

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
  const ps = new kakao.maps.services.Places()
  ps.keywordSearch(`${storeName} 편의점`, (data, status) => {
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
  kakao,
  overlay,
  infoOverlay,
}

export default KakaoService
