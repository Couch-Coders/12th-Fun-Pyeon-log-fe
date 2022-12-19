import { customMarkerImage, getBrandImg, getMarkerImg } from './markerImg'
import star from '../assets/star.png'
import pin from '../assets/pin.png'
import phone from '../assets/phone.png'
import funlogImg from '../assets/convImg/funlog.png'

const { kakao } = window

const overlay = new kakao.maps.CustomOverlay({
  position: new kakao.maps.LatLng(37.54699, 127.09598),
  zIndex: 1,
})

const infoOverlay = new kakao.maps.CustomOverlay({
  position: new kakao.maps.LatLng(37.54699, 127.09598),
  zIndex: 1,
})

// 지도에 마커를 표시하는 함수입니다
const displayMarkerOverlay = (
  data: kakao.maps.services.PlacesSearchResultItem,
  map: kakao.maps.Map
) => {
  //  data에서 브랜드 이름을 빼내고 브랜드에 맞는 이미지를 찾습니다.
  const storeBrand = data.place_name.split(' ')[0]
  const markerImg = getMarkerImg(storeBrand)
  const markerCenter = new kakao.maps.LatLng(+data.y, +data.x)

  // 마커를 생성하고 지도에 표시합니다
  const marker = new kakao.maps.Marker({
    map,
    position: markerCenter,
    image: markerImg ?? customMarkerImage.funMarkerImg,
  })

  const name = data.place_name
  const content = `<div class="infoOverlay">${name}</div>`
  const overlayContent = overlayContainer(name, data.id)

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'click', function () {
    overlay.setContent(overlayContent)
    overlay.setPosition(markerCenter)
    overlay.setMap(map)
    map.panTo(markerCenter)
  })

  // 마커에 마우스오버 이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'mouseover', () => {
    infoOverlay.setContent(content)
    infoOverlay.setPosition(markerCenter)
    infoOverlay.setMap(map)
  })
  // 마커에 마우스아웃 이벤트를 등록합니다
  kakao.maps.event.addListener(marker, 'mouseout', () => {
    infoOverlay.setMap(null)
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
    image: customMarkerImage.myMarkerImg,
  })

  const content = '<div class="infoOverlay me">YOU</div>'
  overlay.setContent(content)
  overlay.setPosition(locPosition)
  overlay.setMap(map)

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition)

  return marker
}

const overlayContainer = (placeName: string, stroeId: string) => {
  const storeBrand = placeName.split(' ')[0]
  const brandimg = getBrandImg(storeBrand)
  return `
  <div class="overlay" >
     <header>
      <img src=${brandimg ?? funlogImg} alt="brand logo"/>
       <h2>${placeName}</h2>
     </header>
    <div class="star-review">
      <div class="star">
        <img src=${star} alt="star image"/>4.6
      </div>
      <div class="review-count">
      리뷰 23개
      </div> 
    </div>
    <div class="store-info">
      <div class="address">
      <img src=${pin} alt="pin image"/><p>서울시 어쩌구 무슨무슨로 2-13</p>
      </div>
      <div class="phone">
      <img src=${phone} alt="phone image"/><p>02-525-2525</p>
      </div>
    </div>
    <div class="detail-view">
      <a href="http://localhost:3000/stores/${stroeId}">상세보기</a>
    </div>
  </div>`
}

const KakaoServie = {
  displayMarkerOverlay,
  displayMyLocation,
  overlayContainer,
  kakao,
  overlay,
}

export default KakaoServie
