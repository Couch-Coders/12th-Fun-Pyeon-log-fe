import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunButton from '@styles/FunButton'
import Select from '@styles/Select/Select'
import { RootState } from '@stores/store'
import { sortData } from '@stores/map/mapSlice'
import { BRANDS, FACILITIES, MOOD, PRODUCT } from '@utils/constants'
import { FilterWrapper, KeywordGroup, Title } from './FilterBox.styles'

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
