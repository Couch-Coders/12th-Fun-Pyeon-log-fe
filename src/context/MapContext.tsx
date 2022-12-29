import React, { createContext, useCallback, useState } from 'react'
import KakaoService from '@services/kakaoService'
import { customMarkerImage, getMarkerImg } from '@services/markerImg'
import { ConvType } from '@stores/conv/convType'

interface MapContextType {
  mapApi: kakao.maps.Map | null
  selectedMarker: kakao.maps.Marker | null
  markers: kakao.maps.Marker[]
  setMapApi: (newMap: kakao.maps.Map) => void
  addMarkers: (newMarker: kakao.maps.Marker) => void
  setMarkers: (data: ConvType, map: kakao.maps.Map) => void
  deleteMarkers: () => void
}

export const MapContext = createContext<MapContextType>({
  mapApi: null,
  markers: [],
  selectedMarker: null,
  setMapApi: (newMap) => {},
  addMarkers: (newMarker) => {},
  setMarkers: (data, map) => {},
  deleteMarkers: () => {},
})

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [newMarkers, setNewMarkers] = useState<kakao.maps.Marker[]>([])
  const [selectedMarker, setSelectedMarker] =
    useState<kakao.maps.Marker | null>(null)

  const setMapApi = useCallback((newMap: kakao.maps.Map) => {
    setMap(newMap)
  }, [])

  const addMarkers = useCallback((newMarker: kakao.maps.Marker) => {
    setNewMarkers((prev) => [...prev, newMarker])
  }, [])

  const setMarkers = useCallback((data: ConvType, map: kakao.maps.Map) => {
    const [storeBrand] = data.place_name.split(' ')
    const markerImg = getMarkerImg(storeBrand)
    const markerCenter = new kakao.maps.LatLng(+data.y, +data.x)

    // 마커를 생성하고 지도에 표시합니다
    const newMarker = new kakao.maps.Marker({
      map,
      position: markerCenter,
      image: markerImg ?? customMarkerImage.funMarkerImg,
    })

    const content = `<div class="infoOverlay">${data.place_name}</div>`
    const overlayContent = KakaoService.overlayContainer({
      placeName: data.place_name,
      storeId: data.id,
      address: data.address_name,
      phoneNumber: data.phone,
      reviewCount: data.reviewCount,
      starCount: data.starCount,
    })

    // 마커에 클릭이벤트를 등록합니다
    kakao.maps.event.addListener(newMarker, 'click', function () {
      KakaoService.overlay.setContent(overlayContent)
      KakaoService.overlay.setPosition(markerCenter)
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

    setNewMarkers((prev) => [...prev, newMarker])
  }, [])

  const deleteMarkers = () => {
    newMarkers.forEach((markerInfo) => {
      markerInfo.setMap(null)
    })
    setNewMarkers([])
  }

  const value = {
    mapApi: map,
    markers: newMarkers,
    selectedMarker,
    setMapApi,
    setMarkers,
    deleteMarkers,
    addMarkers,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export default MapProvider
