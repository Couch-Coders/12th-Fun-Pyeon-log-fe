import React, { useState, useEffect, useContext, useCallback } from 'react'
import List from '@components/ListView/List/List'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@stores/store'
import { ListWrapper, SortBtns, ResultBox } from './ListBox.styles'
import { ConvType } from '@stores/conv/convType'
import { LIST_SORT_ITEMS } from '@utils/constants'
import { distanceSort, reviewSort, starSort } from '@stores/conv/convSlice'
import { saveSortType } from '@stores/sort/sortSlice'
import KakaoService from '@services/kakaoService'
import { MapContext } from '@context/MapContext'
import LoadingWithLogo from '@styles/LoadingWithLogo'

const ListBox = () => {
  const sortedConv = useSelector((state: RootState) => state.conv.sortedStores)
  const loading = useSelector((state: RootState) => state.conv.loading)
  const sortType = useSelector((state: RootState) => state.sort.sortType)
  const { mapApi, setMarkers } = useContext(MapContext)
  const [convList, setConvList] = useState<ConvType[]>([])
  const dispatch = useDispatch()
  const [select, setSelect] = useState(LIST_SORT_ITEMS[0].type)

  const toggleBtn = useCallback(
    (type: string) => {
      setSelect(type)
      dispatch(saveSortType(type))
      if (type === 'star') dispatch(starSort())
      if (type === 'review') dispatch(reviewSort())
      if (type === 'distance') dispatch(distanceSort())
    },
    [dispatch]
  )

  useEffect(() => {
    setConvList(sortedConv)

    if (convList.length > 0) {
      toggleBtn(sortType)
    }
  }, [sortedConv, toggleBtn, convList.length, sortType])

  useEffect(() => {
    if (sortedConv.length > 0 && mapApi) {
      sortedConv.forEach((list) => {
        const marker = KakaoService.displayMarkerOverlay(list, mapApi)
        setMarkers(marker)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedConv])

  return (
    <ListWrapper>
      <SortBtns>
        {LIST_SORT_ITEMS.map((sort) => (
          <li
            key={sort.type}
            className={select === sort.type ? 'active' : ''}
            onClick={() => toggleBtn(sort.type)}
          >
            {sort.title}
          </li>
        ))}
      </SortBtns>

      <ResultBox>
        {loading ? (
          <LoadingWithLogo />
        ) : convList.length === 0 ? (
          <p className="noResult">검색 결과가 없습니다.</p>
        ) : (
          convList.map((store) => (
            <List
              key={store.id}
              starCount={store.starCount}
              keywords={store.keywordList}
              reviewCount={store.reviewCount}
              placeName={store.place_name}
              lat={Number(store.y)}
              lng={Number(store.x)}
              storeId={store.id}
              address={store.address_name}
              phoneNumber={store.phone}
            />
          ))
        )}
      </ResultBox>
    </ListWrapper>
  )
}

export default ListBox
