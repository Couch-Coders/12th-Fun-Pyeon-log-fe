import React, { useContext, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { MapContext } from '@context/MapContext'
import { RootState } from '@stores/store'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { MapViewer } from './Map.styles'

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const searchedCoord = useSelector(
    (state: RootState) => state.sort.searchedCoord
  )
  const { setMapApi } = useContext(MapContext)

  useEffect(() => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMapApi])

  return <MapViewer className="map" ref={mapRef}></MapViewer>
}

export default Map
