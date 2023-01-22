import React, { createContext, useCallback, useState } from 'react'
import KakaoService from '@services/kakaoService'
import { customMarkerImage, getMarkerImg } from '@services/markerImg'
import { setClickedStore } from '@stores/conv/convSlice'
import { ConvType } from '@stores/conv/convType'
import { useAppDispatch } from '@stores/store'

interface MapContextType {
  mapApi: kakao.maps.Map | null
  selectedMarker: kakao.maps.Marker | null
  setMapApi: (newMap: kakao.maps.Map) => void
  setMarkers: (data: ConvType, map: kakao.maps.Map) => void
  deleteMarkers: () => void
  setMyMarker: (map: kakao.maps.Map) => void
}

export const MapContext = createContext<MapContextType>({
  mapApi: null,
  selectedMarker: null,
  setMapApi: (newMap) => {},
  setMarkers: (data, map) => {},
  deleteMarkers: () => {},
  setMyMarker: (map) => {},
})

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map | null>(null)
  const [newMarkers, setNewMarkers] = useState<kakao.maps.Marker[]>([])
  const [selectedMarker, setSelectedMarker] =
    useState<kakao.maps.Marker | null>(null)
  const dispatch = useAppDispatch()

  const setMapApi = useCallback((newMapApi: kakao.maps.Map) => {
    setKakaoMap(newMapApi)
  }, [])

  const setMarkers = useCallback(
    (data: ConvType, map: kakao.maps.Map) => {
      const [storeBrand] = data.place_name.split(' ')
      const markerImg = getMarkerImg(storeBrand)
      const markerCenter = new kakao.maps.LatLng(+data.y, +data.x)

      // 마커를 생성하고 지도에 표시합니다
      const newMarker = new kakao.maps.Marker({
        position: markerCenter,
        image: markerImg ?? customMarkerImage.funMarkerImg,
      })

      const content = `<div class="infoOverlay">${data.place_name}</div>`

      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'click', function () {
        dispatch(
          setClickedStore({
            placeName: data.place_name,
            storeId: data.id,
            address: data.address_name,
            phoneNumber: data.phone,
            reviewCount: data.reviewCount,
            starCount: data.starCount,
          })
        )
        KakaoService.overlay.setPosition(markerCenter)
        KakaoService.overlay.setContent('<div id="kakao-overlay"></div>')
        KakaoService.overlay.setMap(map)
        newMarker.setTitle(data.id)
        setSelectedMarker(newMarker)
        map.panTo(markerCenter)
      })

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'mouseover', () => {
        KakaoService.infoOverlay.setContent(content)
        KakaoService.infoOverlay.setPosition(markerCenter)
        KakaoService.infoOverlay.setMap(map)
      })
      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(newMarker, 'mouseout', () => {
        KakaoService.infoOverlay.setMap(null)
      })

      setNewMarkers((prev) => {
        if (prev.length >= 16) {
          return prev
        }
        newMarker.setMap(map)
        return [...prev, newMarker]
      })
    },
    [dispatch, setNewMarkers]
  )

  const setMyMarker = useCallback((map: kakao.maps.Map) => {
    const myMarker = KakaoService.displayMyLocation(map)
    setNewMarkers((prev) => {
      if (prev.length >= 16) {
        myMarker.setMap(null)
        KakaoService.overlay.setMap(null)
        return prev
      }

      return [...prev, myMarker]
    })
  }, [])

  const deleteMarkers = useCallback(() => {
    setNewMarkers((prev) => {
      prev.forEach((markerInfo) => {
        markerInfo.setMap(null)
      })
      return []
    })
  }, [])

  const value = {
    mapApi: kakaoMap,
    selectedMarker,
    setMapApi,
    setMarkers,
    deleteMarkers,
    setSelectedMarker,
    setMyMarker,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export default MapProvider
