import { useCallback, useContext } from 'react'
import { SearchType } from '@components/MapController/MapController'
import { MapContext } from '@context/MapContext'

import KakaoService from '@services/kakaoService'
import { fetchAllStores } from '@stores/conv/convSlice'
import { saveSearchWord, setSearchedCoord } from '@stores/sort/sortSlice'
import { useAppDispatch } from '@stores/store'

const useSearchStore = () => {
  const dispatch = useAppDispatch()
  const { setMyMarker } = useContext(MapContext)

  const searchCallBack = useCallback(
    (
      data: kakao.maps.services.PlacesSearchResult,
      map: kakao.maps.Map,
      searchType: SearchType
    ) => {
      if (searchType === SearchType.KEYWORD) {
        const bounds = new kakao.maps.LatLngBounds()
        for (let i = 0; i < data.length; i++) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          bounds.extend(
            new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x))
          )
        }
        map.setBounds(bounds)
      }
      // 센터 찾아서 가운데 위치 찾고 마커 표시
      const lat = map.getCenter().getLat()
      const lng = map.getCenter().getLng()

      dispatch(setSearchedCoord({ lat, lng }))
      dispatch(fetchAllStores({ mapData: data, map }))
      setMyMarker(map)
    },
    [dispatch, setMyMarker]
  )

  const searchStore = useCallback(
    (searchType: SearchType, mapApi: kakao.maps.Map, searchTerm?: string) => {
      dispatch(saveSearchWord(''))
      KakaoService.overlay.setMap(null)
      console.log('search again', mapApi)
      if (searchType === SearchType.KEYWORD && searchTerm) {
        //  키워드 서치
        KakaoService.placeSearch.keywordSearch(
          `${searchTerm} 편의점`,
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              searchCallBack(data, mapApi, searchType)
            }
          }
        )
      } else {
        //  카테고리 서치
        KakaoService.placeSearch.categorySearch(
          'CS2',
          (data, status) => {
            if (status === kakao.maps.services.Status.OK) {
              searchCallBack(data, mapApi, searchType)
            }
          },
          //  카테고리 서치 옵션
          {
            location: mapApi.getCenter(),
            sort: kakao.maps.services.SortBy.DISTANCE,
            useMapBounds: true,
          }
        )
      }
    },
    [dispatch, searchCallBack]
  )
  return { searchStore }
}

export default useSearchStore
