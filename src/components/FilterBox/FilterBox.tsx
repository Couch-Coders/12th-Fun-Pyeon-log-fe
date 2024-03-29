import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Select from '@components/common/Select/Select'
import FunButton from '@components/styles/FunButton'
import { MapContext } from '@context/MapContext'
import KakaoService from '@services/kakaoService'
import { setSortStores } from '@stores/conv/convSlice'
import { ConvType } from '@stores/conv/convType'
import { saveBrand, saveKeyword } from '@stores/sort/sortSlice'
import { RootState } from '@stores/store'
import { BRANDS, ITEMS } from '@utils/constants'
import { FilterWrapper, KeywordGroup, Title } from './FilterBox.styles'

interface filterProps {
  setIsFiltering: (isFiltering: boolean) => void
}

const Filter: React.FC<filterProps> = ({ setIsFiltering }) => {
  const { setMarkers, deleteMarkers, mapApi } = useContext(MapContext)
  const stores = useSelector((state: RootState) => state.conv.stores)
  const brandData = useSelector((state: RootState) => state.sort.brandData)
  const keywordData = useSelector((state: RootState) => state.sort.keywordData)
  const dispatch = useDispatch()
  const [selectBrand, setSelectBrand] = useState(brandData)
  const [selectKeyword, setSelectKeyword] = useState(keywordData)
  const [convList, setConvList] = useState(stores)

  // 위 서치로 받아온 data를 다루는 콜백함수
  const sortCallBack = (data: ConvType[]) => {
    if (mapApi) {
      for (let i = 0; i < data.length; i++) {
        setMarkers(data[i], mapApi)
      }
    }
  }

  const sortBrand = () => {
    if (selectBrand.length === 0) {
      return convList
    }
    if (selectBrand.includes('기타')) {
      const newData = stores.filter((data) =>
        selectBrand.includes(data.place_name.split(' ')[0])
      )
      const etcData = stores.filter(
        (data) =>
          !['GS25', 'CU', '세븐일레븐', '이마트24', '미니스톱'].includes(
            data.place_name.split(' ')[0]
          )
      )
      return [...newData, ...etcData]
    }

    return stores.filter((data) =>
      selectBrand.includes(data.place_name.split(' ')[0])
    )
  }

  const sortKeyword = (newData: ConvType[]) => {
    if (selectKeyword.length === 0) {
      return newData
    }
    return newData.filter((data) =>
      data.keywordList.some((keyword) => selectKeyword.includes(keyword))
    )
  }

  const sortStore = () => {
    deleteMarkers()

    const newData = sortBrand()
    const sortResult = sortKeyword(newData)

    dispatch(setSortStores(sortResult))
    sortCallBack(sortResult)

    dispatch(saveBrand(selectBrand))
    dispatch(saveKeyword(selectKeyword))

    setIsFiltering(false)
    KakaoService.overlay.setMap(null)
  }

  const sortInit = () => {
    dispatch(setSortStores(convList))
    sortCallBack(stores)

    setSelectBrand([])
    setSelectKeyword([])

    dispatch(saveBrand([]))
    dispatch(saveKeyword([]))
  }

  return (
    <FilterWrapper>
      <FunButton onClick={sortInit} className="initBtn opposite">
        초기화
      </FunButton>

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
        style={{ width: '100%', minHeight: '30px', fontWeight: '700' }}
        onClick={() => sortStore()}
      >
        찾아보기
      </FunButton>
    </FilterWrapper>
  )
}

export default Filter
