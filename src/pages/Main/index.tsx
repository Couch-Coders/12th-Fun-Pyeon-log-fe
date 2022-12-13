import React, { useRef, useState } from 'react'
import MapContainer from '@components/MapContainer/MapContainer'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Wrapper, ListView, ListTop, SearchBox, SortBtn } from './Main.styles'
import ListBox from '@components/ListBox/ListBox'
import FilterBox from '@components/FilterBox/FilterBox'

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Map = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [isFiltering, setIsFiltering] = useState(false)
  const sortBtnRef = useRef<HTMLButtonElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const updateValue = () => {
    const { current } = inputRef

    if (!current) return
    if (!current.value.trim()) {
      alert('검색어를 입력해주세요.')
      current.value = ''
    } else {
      setKeyword(current.value)
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
            onClick={() => {
              setIsFiltering((prev) => !prev)
              sortBtnRef.current?.classList.toggle('on')
            }}
          >
            <FilterOutlined />
          </SortBtn>
        </ListTop>

        {isFiltering ? <FilterBox /> : <ListBox />}
      </ListView>

      <MapContainer keyword={keyword} />
    </Wrapper>
  )
}

export default Map
