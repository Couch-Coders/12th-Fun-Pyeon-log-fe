import React, { useCallback, useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Tooltip from '@components/tooltip/Tooltip'

import { MapContext } from '@context/MapContext'
import { RootState } from '@stores/store'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'

import { MapViewer } from './Map.styles'

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const isMapMounted = useRef(true)
  const searchedCoord = useSelector(
    (state: RootState) => state.sort.searchedCoord
  )
  const { setMapApi, mapApi } = useContext(MapContext)

  useEffect(() => {
    if (isMapMounted.current) {
      if (mapRef.current) mapRef.current.innerHTML = ''
      const mapContainer = mapRef.current as HTMLDivElement
      const mapOption = {
        center: searchedCoord
          ? new kakao.maps.LatLng(searchedCoord.lat, searchedCoord.lng)
          : new kakao.maps.LatLng(
              DEFAULT_KAKAO_COORD.lat,
              DEFAULT_KAKAO_COORD.lng
            ), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      }
      const map = new kakao.maps.Map(mapContainer, mapOption)
      setMapApi(map)
    }
    return () => {
      isMapMounted.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMapApi, searchedCoord])

  const resizeMap = useCallback(() => {
    if (mapApi && searchedCoord)
      mapApi.setCenter(
        new kakao.maps.LatLng(searchedCoord.lat, searchedCoord.lng)
      )
  }, [mapApi, searchedCoord])

  useEffect(() => {
    window.addEventListener('resize', resizeMap)
    return () => {
      window.removeEventListener('resize', resizeMap)
    }
  }, [resizeMap])

  return (
    <MapViewer className="map" ref={mapRef}>
      <Tooltip />
    </MapViewer>
  )
}

export default Map
