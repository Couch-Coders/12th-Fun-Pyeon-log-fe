import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunButton from '@styles/FunButton'
import Select from '@components/common/Select/Select'
import { RootState } from '@stores/store'
import { sortData } from '@stores/map/mapSlice'
import { BRANDS, ITEMS } from '@utils/constants'
import { FilterWrapper, KeywordGroup, Title } from './FilterBox.styles'
import kakaoServie from '@services/kakaoService'
import { MapContext } from '@context/MapContext'

interface filterProps {
  setIsFiltering: (isFiltering: boolean) => void
}

const Filter = ({ setIsFiltering }: filterProps) => {
  const { setMarkers, deleteMarkers, mapApi } = useContext(MapContext)
  const [selectBrand, setSelectBrand] = useState<string[]>([])
  const [selectKeyword, setSelectKeyword] = useState<string[]>([])

  const mapData = useSelector((state: RootState) => state.map.data)
  const dispatch = useDispatch()
  // 위 서치로 받아온 data를 다루는 콜백함수
  const sortCallBack = (data: kakao.maps.services.PlacesSearchResultItem[]) => {
    if (mapApi) {
      for (let i = 0; i < data.length; i++) {
        const marker = kakaoServie.displayMarkerInfoWindow(data[i], mapApi)
        setMarkers(marker)
      }
    }
  }

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
    setIsFiltering(false)
  }

  return (
    <FilterWrapper>
      <FunButton
        name={'초기화'}
        onClick={sortInit}
        className="initBtn opposite"
      />

      <div>
        <Title>브랜드</Title>
        <Select
          keywordArray={BRANDS}
          selected={selectBrand}
          setSelected={setSelectBrand}
          selectType={'brand'}
        />
      </div>

      <KeywordGroup>
        <Title>키워드</Title>

        <>
          {ITEMS.map((el) => (
            <Select
              key={el.title}
              title={el.title}
              keywordArray={el.keywordArray}
              selected={selectKeyword}
              setSelected={setSelectKeyword}
              selectType={'checkbox'}
            />
          ))}
        </>
      </KeywordGroup>

      <FunButton
        name={'찾아보기'}
        style={{ width: '100%', minHeight: '30px', fontWeight: '700' }}
        onClick={() => sortStore()}
      />
    </FilterWrapper>
  )
}

export default Filter
