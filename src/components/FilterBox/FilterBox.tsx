import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FunButton from '@styles/FunButton'
import Select from '@components/common/Select/Select'
import { RootState } from '@stores/store'
import { setSortStores } from '@stores/conv/convSlice'
import { BRANDS, ITEMS } from '@utils/constants'
import { FilterWrapper, KeywordGroup, Title } from './FilterBox.styles'
import kakaoServie from '@services/kakaoService'
import { MapContext } from '@context/MapContext'
import { ConvType } from '@stores/conv/convType'

interface filterProps {
  setIsFiltering: (isFiltering: boolean) => void
}

const Filter: React.FC<filterProps> = ({ setIsFiltering }) => {
  const { setMarkers, deleteMarkers, mapApi } = useContext(MapContext)
  const stores = useSelector((state: RootState) => state.conv.stores)
  const dispatch = useDispatch()
  const [selectBrand, setSelectBrand] = useState<string[]>([])
  const [selectKeyword, setSelectKeyword] = useState<string[]>([])
  const [convList, setConvList] = useState(stores)

  // 위 서치로 받아온 data를 다루는 콜백함수
  const sortCallBack = (data: ConvType[]) => {
    if (mapApi) {
      for (let i = 0; i < data.length; i++) {
        const marker = kakaoServie.displayMarkerInfoWindow(data[i], mapApi)
        setMarkers(marker)
      }
    }
  }

  const sortStore = () => {
    deleteMarkers()
    let newData: ConvType[]

    if (selectBrand.length === 0) {
      newData = convList
    } else if (selectBrand.includes('기타')) {
      newData = stores.filter((data) =>
        selectBrand.includes(data.place_name.split(' ')[0])
      )
      const etcData = stores.filter(
        (data) =>
          !['GS25', 'CU', '세븐일레븐', '이마트24', '미니스톱'].includes(
            data.place_name.split(' ')[0]
          )
      )
      newData = [...newData, ...etcData]
    } else {
      newData = stores.filter((data) =>
        selectBrand.includes(data.place_name.split(' ')[0])
      )
    }
    console.log(newData)

    dispatch(setSortStores(newData))
    sortCallBack(newData)

    sessionStorage.setItem('brand', JSON.stringify(selectBrand))
    sessionStorage.setItem('keyword', JSON.stringify(selectKeyword))

    setIsFiltering(false)
  }

  const sortInit = () => {
    dispatch(setSortStores(convList))
    sortCallBack(stores)

    setSelectBrand([])
    setSelectKeyword([])

    sessionStorage.clear()
  }

  useEffect(() => {
    const brandData = sessionStorage.getItem('brand')
    const keywordData = sessionStorage.getItem('keyword')

    if (!brandData || !keywordData) return

    setSelectBrand(JSON.parse(brandData))
    setSelectKeyword(JSON.parse(keywordData))
  }, [])

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
