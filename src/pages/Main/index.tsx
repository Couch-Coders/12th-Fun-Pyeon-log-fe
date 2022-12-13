import React, { useRef, useState } from 'react'
import MapContainer from '@components/MapContainer/MapContainer'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Wrapper, ListView, ListTop, SearchBox, FilterBtn } from './Main.styles'
import ListBox from '@components/ListBox/ListBox'

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Main = () => {
  const [keyword, setKeyword] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const updateValue = () => {
    if (inputRef.current) {
      if (!inputRef.current.value.trim()) {
        alert('검색어를 입력해주세요.')
        inputRef.current.value = ''
      } else {
        setKeyword(inputRef.current.value)
      }
    }

    // if (inputRef.current && inputRef?.current.value.trim()) {
    //   setKeyword(inputRef.current.value)
    //   // inputRef.current.value = ''
    // } else {
    //   alert('검색어를 입력해주세요.')
    // }
  }

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') updateValue()
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
              onKeyUp={onKeyUp}
            />
            <button onClick={updateValue}>
              <SearchOutlined />
            </button>
          </SearchBox>

          <FilterBtn>
            <FilterOutlined />
          </FilterBtn>
        </ListTop>

        <ListBox />
      </ListView>

      <MapContainer keyword={keyword} />
    </Wrapper>
  )
}

export default Main
