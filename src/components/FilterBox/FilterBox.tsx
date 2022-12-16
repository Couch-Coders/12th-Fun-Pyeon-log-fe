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
  const mapData = useSelector((state: RootState) => state.map.data)
  const dispatch = useDispatch()

  const [selectBrand, setSelectBrand] = useState<string[]>([])
  const [selectKeyword, setSelectKeyword] = useState<string[]>([])
  const [mapList, setMapList] = useState(mapData)

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
    console.log(selectBrand, selectKeyword)

    deleteMarkers()
    let newData: kakao.maps.services.PlacesSearchResultItem[]

    if (selectBrand.length === 0) {
      newData = mapList
    } else if (selectBrand.includes('기타')) {
      newData = mapData.filter((data) =>
        selectBrand.includes(data.place_name.split(' ')[0])
      )
      const etcData = mapData.filter(
        (data) =>
          !['GS25', 'CU', '세븐일레븐', '이마트24', '미니스톱'].includes(
            data.place_name.split(' ')[0]
          )
      )
      newData = [...newData, ...etcData]
    } else {
      newData = mapData.filter((data) =>
        selectBrand.includes(data.place_name.split(' ')[0])
      )
    }

    dispatch(sortData(newData))
    sortCallBack(newData)

    sessionStorage.setItem('brand', JSON.stringify(selectBrand))
    sessionStorage.setItem('keyword', JSON.stringify(selectKeyword))

    setIsFiltering(false)
  }

  const sortInit = () => {
    dispatch(sortData(mapList))
    sortCallBack(mapData)

    setSelectBrand([])
    setSelectKeyword([])

    sessionStorage.clear()
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
