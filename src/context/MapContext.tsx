import React, { createContext, useCallback, useState } from 'react'

interface MapContextType {
  mapApi: kakao.maps.Map | null
  markers: kakao.maps.Marker[]
  setMapApi: (newMap: kakao.maps.Map) => void
  setMarkers: (newMarker: kakao.maps.Marker) => void
  deleteMarkers: () => void
}

export const MapContext = createContext<MapContextType>({
  mapApi: null,
  markers: [],
  setMapApi: (newMap) => {},
  setMarkers: (newMarker) => {},
  deleteMarkers: () => {},
})

const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null)
  const [newMarkers, setNewMarkers] = useState<kakao.maps.Marker[]>([])

  const setMapApi = useCallback((newMap: kakao.maps.Map) => {
    setMap(newMap)
  }, [])

  const setMarkers = useCallback((newMarker: kakao.maps.Marker) => {
    setNewMarkers((prev) => [...prev, newMarker])
  }, [])

  const deleteMarkers = useCallback(() => {
    newMarkers.forEach((markerInfo) => {
      markerInfo.setMap(null)
    })
    setNewMarkers([])
  }, [newMarkers])

  const value = {
    mapApi: map,
    markers: newMarkers,
    setMapApi,
    setMarkers,
    deleteMarkers,
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>
}

export default MapProvider
