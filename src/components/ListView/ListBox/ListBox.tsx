import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react'
import { useSelector } from 'react-redux'
import List from '@components/ListView/List/List'
import LoadingWithLogo from '@components/styles/LoadingWithLogo'
import { MapContext } from '@context/MapContext'
import { distanceSort, reviewSort, starSort } from '@stores/conv/convSlice'
import { ConvType } from '@stores/conv/convType'
import { saveSortType } from '@stores/sort/sortSlice'
import { RootState, useAppDispatch } from '@stores/store'
import { LIST_SORT_ITEMS } from '@utils/constants'
import { ListWrapper, SortBtns, ResultBox } from './ListBox.styles'

const ListBox = () => {
  const dispatch = useAppDispatch()
  const sortedConv = useSelector((state: RootState) => state.conv.sortedStores)
  const loading = useSelector((state: RootState) => state.conv.loading)
  const sortType = useSelector((state: RootState) => state.sort.sortType)
  const { mapApi, setMarkers, selectedMarker, deleteMarkers } =
    useContext(MapContext)
  const [convList, setConvList] = useState<ConvType[]>([])
  const [select, setSelect] = useState(LIST_SORT_ITEMS[0].type)
  const [targetStoreId, setTargetStoreId] = useState('')
  const listRef = useRef<HTMLLIElement[] | null[]>([])

  useEffect(() => {
    if (selectedMarker) setTargetStoreId(selectedMarker?.getTitle())
  }, [selectedMarker])

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

  const moveToTarget = useCallback((storeId: string) => {
    listRef.current[Number(storeId)]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }, [])

  useEffect(() => {
    moveToTarget(targetStoreId)
  }, [targetStoreId, moveToTarget])

  useEffect(() => {
    setConvList(sortedConv)

    if (convList.length > 0) {
      toggleBtn(sortType)
    }
  }, [sortedConv, toggleBtn, convList.length, sortType])

  useEffect(() => {
    if (sortedConv.length > 0 && mapApi) {
      console.log(sortedConv, 'set marker')
      deleteMarkers()
      sortedConv.forEach((list) => {
        setMarkers(list, mapApi)
      })
    }
  }, [sortedConv, mapApi, setMarkers, deleteMarkers])

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
            <li
              key={store.id}
              ref={(el) => (listRef.current[Number(store.id)] = el)}
            >
              <List
                starCount={store.starCount}
                keywords={store.keywordList}
                reviewCount={store.reviewCount}
                placeName={store.place_name}
                lat={Number(store.y)}
                lng={Number(store.x)}
                storeId={store.id}
                address={store.address_name}
                phoneNumber={store.phone}
                targetStoreId={targetStoreId}
                setTargetStoreId={setTargetStoreId}
              />
            </li>
          ))
        )}
      </ResultBox>
    </ListWrapper>
  )
}

export default ListBox
