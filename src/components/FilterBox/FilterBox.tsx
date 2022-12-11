import React from 'react'
import { FilterWrapper } from './FilterBox.styles'
import Brand from '@components/Brand/Brand'
import KeywordBox from '@components/Keyword/KeywordBox'

const Filter = () => {
  return (
    <FilterWrapper>
      <Brand />
      <KeywordBox />
      <button>찾아보기</button>
    </FilterWrapper>
  )
}

export default Filter
