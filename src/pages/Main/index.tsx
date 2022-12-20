import React, { useRef, useState } from 'react'
import MapContainer from '@components/MapContainer/MapContainer'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Wrapper, ListView, ListTop, SearchBox, SortBtn } from './Main.styles'
import FilterBox from '@components/FilterBox/FilterBox'
import ListBox from '@components/ListView/ListBox/ListBox'
import { useDispatch } from 'react-redux'
import { saveSearchWord } from '@stores/sort/sortSlice'

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Map = () => {
  const [isFiltering, setIsFiltering] = useState(false)
  const sortBtnRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const updateValue = () => {
    const { current } = inputRef

    if (!current) return
    if (current.value.trim()) {
      dispatch(saveSearchWord(current.value))
    } else {
      alert('검색어를 입력해주세요.')
      current.value = ''
    }
  }

  return (
    <Wrapper>
      <ListView>
        <ListTop>
          <SearchBox>
            <input
              type="text"
              ref={inputRef}
              placeholder="편의점을 검색하세요."
              onKeyUp={(e) => {
                if (e.key === 'Enter') updateValue()
              }}
            />
            <button onClick={updateValue}>
              <SearchOutlined />
            </button>
          </SearchBox>

          <SortBtn
            ref={sortBtnRef}
            className={isFiltering ? 'on' : ''}
            onClick={() => {
              setIsFiltering((prev) => !prev)
            }}
          >
            <FilterOutlined />
          </SortBtn>
        </ListTop>

        {isFiltering ? (
          <FilterBox setIsFiltering={setIsFiltering} />
        ) : (
          <ListBox />
        )}
      </ListView>

      <MapContainer />
    </Wrapper>
  )
}

export default Map
