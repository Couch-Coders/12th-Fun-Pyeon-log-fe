<<<<<<< HEAD:src/components/ListBox/ListBox.tsx
import React from 'react'
import List from '@components/List/List'
import { useSelector } from 'react-redux'
import type { RootState } from '@stores/store'
import { ListWrapper, SortBtns, ResultBox } from './ListBox.styles'

const ListBox = () => {
  const mapData = useSelector((state: RootState) => state.map.data)
  return (
    <ListWrapper>
      <SortBtns>
        <li className="active">가까운순</li>
        <li>별점 높은순</li>
        <li>리뷰 많은순</li>
      </SortBtns>

      <ResultBox>
        {mapData.length === 0 ? (
          <p className="noResult">검색 결과가 없습니다.</p>
        ) : (
          mapData.map((map) => (
            <List
              key={map.id}
              placeName={map.place_name}
              lat={+map.y}
              lng={+map.x}
              storeId={map.id}
            />
          ))
        )}
      </ResultBox>
    </ListWrapper>
  )
}

export default ListBox
=======
import React from 'react'
import List from '@components/ListView/List/List'
import { useSelector } from 'react-redux'
import type { RootState } from '@stores/store'
import { ListWrapper, SortBtns, ResultBox } from './ListBox.styles'

const ListBox = () => {
  const mapData = useSelector((state: RootState) => state.map.data)
  return (
    <ListWrapper>
      <SortBtns>
        <li className="active">가까운순</li>
        <li>별점 높은순</li>
        <li>리뷰 많은순</li>
      </SortBtns>

      <ResultBox>
        {mapData.length === 0 ? (
          <p className="noResult">검색 결과가 없습니다.</p>
        ) : (
          mapData.map((map) => (
            <List
              key={map.id}
              placeName={map.place_name}
              lat={+map.y}
              lng={+map.x}
            />
          ))
        )}
      </ResultBox>
    </ListWrapper>
  )
}

export default ListBox
>>>>>>> develop:src/components/ListView/ListBox/ListBox.tsx
