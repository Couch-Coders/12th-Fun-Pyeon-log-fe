export const PRODUCT = [
  '제품이 다양해요',
  '트렌디한 상품이 많아요',
  '자체상품이 좋아요',
  '커피머신이 있어요',
  '행사상품이 다양해요',
]

export const MOOD = [
  '직원이 친절해요',
  '매장이 청결해요',
  '뷰가 좋아요',
  '혼밥하기 좋아요',
]

export const FACILITIES = [
  '매장이 넓어요',
  '접근성이 좋아요',
  '테이블이 많아요',
  '택배이용이 편리해요',
  '취식공간이 잘 되어있어요',
  '주차하기 편해요',
]

export const BRANDS = [
  'GS25',
  'CU',
  '세븐일레븐',
  '이마트24',
  '미니스톱',
  '기타',
]

export const STAR_COUNT = [0, 1, 2, 3, 4]

export const DEFAULT_KAKAO_COORD = { lat: 37.5547, lng: 126.9707 }

export const ITEMS = [
  { title: '제품', keywordArray: PRODUCT },
  { title: '분위기', keywordArray: MOOD },
  { title: '편의시설', keywordArray: FACILITIES },
]

export const LIST_SORT_ITEMS = [
  { type: 'distance', title: '가까운순' },
  { type: 'star', title: '별점 높은순' },
  { type: 'review', title: '리뷰 많은순' },
]

export const REVIEW_SIZE = 10
