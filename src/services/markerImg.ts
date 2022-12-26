import cuMarker from '../assets/brandMaker/cuMaker.png'
import emartMarker from '../assets/brandMaker/emartMaker.png'
import funMarker from '../assets/brandMaker/funlogMaker.png'
import GsMarker from '../assets/brandMaker/gsMaker.png'
import miniMarker from '../assets/brandMaker/ministopMaker.png'
import myMarker from '../assets/brandMaker/myMarker.svg'
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

// 사용자 개인 마커 샘플이미지
export const customMarkerImage = {
  myMarkerImg: new kakao.maps.MarkerImage(
    myMarker,
    new kakao.maps.Size(20, 20)
  ),
  gsMarkerImg: new kakao.maps.MarkerImage(
    GsMarker,
    new kakao.maps.Size(30, 40)
  ),
  cuMarkerImg: new kakao.maps.MarkerImage(
    cuMarker,
    new kakao.maps.Size(30, 40)
  ),
  miniMarkerImg: new kakao.maps.MarkerImage(
    miniMarker,
    new kakao.maps.Size(30, 40)
  ),
  sevenMarkerImg: new kakao.maps.MarkerImage(
    sevenMarker,
    new kakao.maps.Size(30, 40)
  ),
  emartMarkerImg: new kakao.maps.MarkerImage(
    emartMarker,
    new kakao.maps.Size(30, 40)
  ),
  funMarkerImg: new kakao.maps.MarkerImage(
    funMarker,
    new kakao.maps.Size(30, 40)
  ),
}

// 마커 이미지 선택기
export const getMarkerImg = (placeName: string) =>
  ({
    [CUSTOM_MARKER_CLASS.gs]: customMarkerImage.gsMarkerImg,
    [CUSTOM_MARKER_CLASS.cu]: customMarkerImage.cuMarkerImg,
    [CUSTOM_MARKER_CLASS.mini]: customMarkerImage.miniMarkerImg,
    [CUSTOM_MARKER_CLASS.seven]: customMarkerImage.sevenMarkerImg,
    [CUSTOM_MARKER_CLASS.emart]: customMarkerImage.emartMarkerImg,
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
