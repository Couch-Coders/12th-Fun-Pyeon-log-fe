import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import FilterBox from '@components/FilterBox/FilterBox'
import ListBox from '@components/ListView/ListBox/ListBox'
import MapContainer from '@components/MapContainer/MapContainer'
import { MapContext } from '@context/MapContext'
import { setUserPosition } from '@stores/auth/authSlice'
import { saveSearchWord } from '@stores/sort/sortSlice'
import { RootState, useAppDispatch } from '@stores/store'
import styled from 'styled-components'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import { Wrapper, ListView, ListTop, SearchBox, SortBtn } from './Main.styles'

styled(MapContainer)`
  width: 70vw;
  border: 1px solid #222;
`

const Map = () => {
  const [isFiltering, setIsFiltering] = useState(false)
  const sortBtnRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const { mapApi } = useContext(MapContext)
  const usePosition = useSelector((state: RootState) => state.user.userPostion)
  const searchedCoord = useSelector(
    (state: RootState) => state.sort.searchedCoord
  )
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

  useEffect(() => {
    if (!usePosition) return
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
    }
    console.log('좌표설정 시도')
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude // 위도
        const lng = position.coords.longitude // 경도
        dispatch(setUserPosition({ lat, lng }))
      },
      () => {
        alert('위치 정보 제공에 동의하지 않을 시 사용자의 위치는 서울역입니다.')
        dispatch(setUserPosition({ lat: -1, lng: -1 }))
      }
    )
  }, [])

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
