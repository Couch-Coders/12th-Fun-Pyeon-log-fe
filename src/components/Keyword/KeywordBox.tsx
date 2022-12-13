import React from 'react'
import Keywords from './Keywords'
import { Title } from '@components/FilterBox/FilterBox.styles'

const product = [
  '제품이 다양해요',
  '트렌디한 상품이 많아요',
  '자체상품이 좋아요',
  '커피머신이 있어요',
  '행사상품이 다양해요',
]

const mood = [
  '직원이 친절해요',
  '매장이 청결해요',
  '뷰가 좋아요',
  '혼밥하기 좋아요',
]

const facilities = [
  '매장이 넓어요',
  '접근성이 좋아요',
  '테이블이 많아요',
  '택배이용이 편리해요',
  '취식공간이 잘 되어있어요',
  '주차하기 편해요',
]

const KeywordBox = () => {
  return (
    <div>
      <Title>키워드</Title>

      <Keywords name="제품" array={product} />
      <Keywords name="분위기" array={mood} />
      <Keywords name="편의시설" array={facilities} />
    </div>
  )
}

export default KeywordBox
