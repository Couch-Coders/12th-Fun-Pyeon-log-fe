import React from 'react'
import Brand from '@components/Brand/Brand'
import KeywordBox from '@components/Keyword/KeywordBox'
import FunButton from '@styles/FunButton'
import { FilterWrapper } from './FilterBox.styles'

const Filter = () => {
  return (
    <FilterWrapper>
      <Brand />
      <KeywordBox />
      <FunButton
        name={'찾아보기'}
        style={{ width: '100%', minHeight: '30px', fontWeight: '700' }}
      />
    </FilterWrapper>
  )
}

export default Filter
