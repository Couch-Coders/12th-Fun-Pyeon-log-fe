import React, { useState, useEffect } from 'react'
import List from '@components/ListView/List/List'
import { useSelector } from 'react-redux'
import type { RootState } from '@stores/store'
import { ListWrapper, SortBtns, ResultBox } from './ListBox.styles'
import { ConvType } from '@stores/conv/convType'

const ListBox = () => {
  const stores = useSelector((state: RootState) => state.conv.stores)
  const sortedConv = useSelector((state: RootState) => state.conv.sortedStores)
  const [convList, setConvList] = useState<ConvType[]>(stores)

  useEffect(() => {
    setConvList(sortedConv)
  }, [sortedConv])

  return (
    <ListWrapper>
      <SortBtns>
        {SORT_LIST.map((sort) => (
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
        {convList.length === 0 ? (
          <p className="noResult">검색 결과가 없습니다.</p>
        ) : (
          convList.map((store) => (
            <List
              key={store.id}
              starCount={store.starCount}
              keywords={store.keywordList}
              reviewCount={store.reviewCount}
              placeName={store.place_name}
              lat={+store.y}
              lng={+store.x}
              storeId={store.id}
            />
          ))
        )}
      </ResultBox>
    </ListWrapper>
  )
}

export default ListBox
