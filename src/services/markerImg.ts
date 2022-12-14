import GsImg from '../assets/brandMaker/gsMaker.png'
import cuImg from '../assets/brandMaker/cuMaker.png'
import miniImg from '../assets/brandMaker/ministopMaker.png'
import sevenImg from '../assets/brandMaker/sevenMaker.png'
import emartImg from '../assets/brandMaker/emartMaker.png'
import funMarkerImg from '../assets/brandMaker/funlogMaker.png'

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
    'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
    new kakao.maps.Size(31, 35)
  ),
  gsMarkerImg: new kakao.maps.MarkerImage(GsImg, new kakao.maps.Size(30, 40)),
  cuMarkerImg: new kakao.maps.MarkerImage(cuImg, new kakao.maps.Size(30, 40)),
  miniMarkerImg: new kakao.maps.MarkerImage(
    miniImg,
    new kakao.maps.Size(30, 40)
  ),
  sevenMarkerImg: new kakao.maps.MarkerImage(
    sevenImg,
    new kakao.maps.Size(30, 40)
  ),
  emartMarkerImg: new kakao.maps.MarkerImage(
    emartImg,
    new kakao.maps.Size(30, 40)
  ),
  funMarkerImg: new kakao.maps.MarkerImage(
    funMarkerImg,
    new kakao.maps.Size(30, 40)
  ),
}
