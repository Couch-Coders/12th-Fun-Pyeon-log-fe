import cuMarker from '../assets/brandMaker/cuMaker.png'
import emartMarker from '../assets/brandMaker/emartMaker.png'
import gsMarker from '../assets/brandMaker/gsMaker.png'
import miniMarker from '../assets/brandMaker/ministopMaker.png'
import sevenMarker from '../assets/brandMaker/sevenMaker.png'
import cuImg from '../assets/convImg/cu.png'
import emartImg from '../assets/convImg/emart.png'
import gsImg from '../assets/convImg/gs.png'
import ministopImg from '../assets/convImg/ministop.png'
import sevenImg from '../assets/convImg/seven.png'

export enum CUSTOM_MARKER_CLASS {
  gs = 'GS25',
  cu = 'CU',
  mini = '미니스톱',
  seven = '세븐일레븐',
  emart = '이마트24',
}

// 마커 이미지 선택기
export const getMarkerImg = (kakaoService: typeof kakao, placeName: string) =>
  ({
    [CUSTOM_MARKER_CLASS.gs]: new kakaoService.maps.MarkerImage(
      gsMarker,
      new kakaoService.maps.Size(30, 40)
    ),
    [CUSTOM_MARKER_CLASS.cu]: new kakaoService.maps.MarkerImage(
      cuMarker,
      new kakaoService.maps.Size(30, 40)
    ),
    [CUSTOM_MARKER_CLASS.mini]: new kakaoService.maps.MarkerImage(
      miniMarker,
      new kakaoService.maps.Size(30, 40)
    ),
    [CUSTOM_MARKER_CLASS.seven]: new kakaoService.maps.MarkerImage(
      sevenMarker,
      new kakaoService.maps.Size(30, 40)
    ),
    [CUSTOM_MARKER_CLASS.emart]: new kakaoService.maps.MarkerImage(
      emartMarker,
      new kakaoService.maps.Size(30, 40)
    ),
  }[placeName])

// 브랜드 이미지 선택기
export const getBrandImg = (placeName: string) =>
  ({
    [CUSTOM_MARKER_CLASS.gs]: gsImg,
    [CUSTOM_MARKER_CLASS.cu]: cuImg,
    [CUSTOM_MARKER_CLASS.mini]: ministopImg,
    [CUSTOM_MARKER_CLASS.seven]: sevenImg,
    [CUSTOM_MARKER_CLASS.emart]: emartImg,
  }[placeName])
