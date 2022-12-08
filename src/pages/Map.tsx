import React, { useState } from 'react'
import MapContainer from '@components/MapContainer'
import { useSelector } from 'react-redux'
import type { RootState } from '@stores/store'
import List from '@components/List'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
`
const ListView = styled.div`
  position: relative;
  z-index: 2;
  width: 30vw;
  height: calc(100vh - 80px);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

  z-index: 10;

  form {
    height: 50px;
    border-bottom: 1px solid #ddd;
    padding: 10px 20px;
  }
`

const ListWrapper = styled.div`
  height: calc(100% - 50px);
  overflow-x: scroll;

  p {
    padding: 10px;
  }
`

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Map = () => {
  const mapData = useSelector((state: RootState) => state.map.data)

  const [value, setValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value.trim()) {
      alert('검색어를 입력해주세요.')
      setValue('')
    } else {
      setKeyword(value)
      setValue('')
    }
  }

  return (
    <div>
      <Wrapper>
        <ListView>
          <form onSubmit={onSubmit}>
            <input type="text" value={value} onChange={onChange} />
            <input type="submit" value="검색" />
          </form>
          <ListWrapper>
            {mapData.length === 0 ? (
              <p>검색 결과가 없습니다.</p>
            ) : (
              mapData.map((map) => (
                <List key={map.id} placeName={map.place_name} />
              ))
            )}
          </ListWrapper>
        </ListView>

        <MapContainer keyword={keyword} />
      </Wrapper>
    </div>
  )
}

export default Map
