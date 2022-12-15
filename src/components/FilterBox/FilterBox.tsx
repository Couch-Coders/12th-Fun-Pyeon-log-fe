import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunButton from '@styles/FunButton'
import Select from '@components/common/Select/Select'
import { RootState } from '@stores/store'
import { sortData } from '@stores/map/mapSlice'
import { BRANDS, FACILITIES, MOOD, PRODUCT } from '@utils/constants'
import { FilterWrapper, KeywordGroup, Title } from './FilterBox.styles'

const Filter = () => {
  const [selectBrand, setSelectBrand] = useState<string[]>([])
  const [selectKeyword, setSelectKeyword] = useState<string[]>([])

  /*
  const mapData = useSelector((state: RootState) => state.map.data)
  const dispatch = useDispatch()

  const sortStore = () => {
    console.log(selectBrand)
    console.log(selectKeyword)

    const isIncluded = (data: kakao.maps.services.PlacesSearchResultItem) => {
      for (let idx = 0; idx < selectBrand.length; idx++) {
        if (data.place_name.includes(selectBrand[idx])) return true
      }
    }
    const newData = mapData.filter(isIncluded)
    console.log(newData)
    dispatch(sortData(newData))
  }
  */

  return (
    <FilterWrapper>
      <div>
        <Title>브랜드</Title>
        <Select
          keyword={BRANDS}
          selected={selectBrand}
          setSelected={setSelectBrand}
          selectType={'brand'}
        />
      </div>

      <KeywordGroup>
        <Title>키워드</Title>
        <Select
          title="제품"
          keyword={PRODUCT}
          selected={selectKeyword}
          setSelected={setSelectKeyword}
          selectType={'checkbox'}
        />
        <Select
          title="분위기"
          keyword={MOOD}
          selected={selectKeyword}
          setSelected={setSelectKeyword}
          selectType={'checkbox'}
        />
        <Select
          title="편의시설"
          keyword={FACILITIES}
          selected={selectKeyword}
          setSelected={setSelectKeyword}
          selectType={'checkbox'}
        />
      </KeywordGroup>

      <FunButton
        name={'찾아보기'}
        style={{ width: '100%', minHeight: '30px', fontWeight: '700' }}
        // onClick={() => sortStore()}
      />
    </FilterWrapper>
  )
}

export default Filter
