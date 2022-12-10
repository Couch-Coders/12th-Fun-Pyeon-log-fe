import React, { useRef, useState } from 'react'
import MapContainer from '@components/MapContainer/MapContainer'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Wrapper, ListView, ListTop, SearchBox, SortBtn } from './Map.styles'
import ListBox from '@components/ListBox/ListBox'

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Map = () => {
  const [keyword, setKeyword] = useState<string>('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const updateValue = () => {
    if (inputRef.current) {
      if (!inputRef.current.value.trim()) {
        alert('검색어를 입력해주세요.')
        inputRef.current.value = ''
      } else {
        setKeyword(inputRef.current.value)
      }
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

          <SortBtn>
            <FilterOutlined />
          </SortBtn>
        </ListTop>

        <ListBox />
      </ListView>

      <MapContainer keyword={keyword} />
    </Wrapper>
  )
}

export default Map
