import React, { useState } from 'react'
import MapContainer from '@components/MapContainer'
import { useSelector } from 'react-redux'
import type { RootState } from '@stores/store'
// import { useAppDispatch } from '@stores/store'
// import { getMapThunk } from '@stores/map/mapThunk'
import List from '@components/List'
import useScript from 'react-script-hook/lib/use-script'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: row;
`
const ListView = styled.div`
  width: 30vw;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);

  form {
    border-bottom: 1px solid #ddd;
    padding: 10px 20px;
  }
`

const ListWrapper = styled.div`
  height: 80vh;
  overflow-x: scroll;
`

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Map = () => {
  const [loading, error] = useScript({
    src: '//dapi.kakao.com/v2/maps/sdk.js?appkey=d25f19cf0a1860dd105275f8a970b86d&libraries=services',
    onload: () => console.log('Script loaded!'),
  })

  const mapData = useSelector((state: RootState) => state.map.data)
  // const dispatch = useAppDispatch()

  const [value, setValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) {
      alert('검색어를 입력해주세요.')
    } else {
      // dispatch(getMapThunk(value))
      setKeyword(value)
      setValue('')
    }
  }

  return (
    <div>
      {!loading && !error ? (
        <>
          <Wrapper>
            <ListView>
              <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={onChange} />
                <input type="submit" value="검색" />
              </form>
              <ListWrapper>
                {mapData.map((map) => (
                  <List key={map.id} {...map} />
                ))}
              </ListWrapper>
            </ListView>

            <MapContainer keyword={keyword} />
          </Wrapper>
        </>
      ) : (
        <div>error</div>
      )}
    </div>
  )
}

export default Map
