import React from 'react'
import Keywords from './Keywords'
import { Title } from '@components/FilterBox/FilterBox.styles'
import { FACILITIES, MOOD, PRODUCT } from '@utils/constants'

const KeywordBox = () => {
  return (
    <div>
      <Title>키워드</Title>

      <Keywords title="제품" keyword={PRODUCT} />
      <Keywords title="분위기" keyword={MOOD} />
      <Keywords title="편의시설" keyword={FACILITIES} />
    </div>
  )
}

export default KeywordBox
