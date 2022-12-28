import React, { useContext, useEffect, useRef } from 'react'
import { MapContext } from '@context/MapContext'
import { DEFAULT_KAKAO_COORD } from '@utils/constants'
import { MapViewer } from './Map.styles'

// interface Props {
//   children?: ReactNode
// }

// const Map = forwardRef<HTMLDivElement, Props>(function Map(props, ref) {
//   return <MapViewer className="map" ref={ref}></MapViewer>
// })

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const { setMapApi } = useContext(MapContext)

  useEffect(() => {
    if (mapRef.current) mapRef.current.innerHTML = ''
    const mapContainer = mapRef.current as HTMLDivElement
    const mapOption = {
      center: new kakao.maps.LatLng(
        DEFAULT_KAKAO_COORD.lat,
        DEFAULT_KAKAO_COORD.lng
      ), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    }
    const map = new kakao.maps.Map(mapContainer, mapOption)
    setMapApi(map)
  }, [setMapApi])

  return <MapViewer className="map" ref={mapRef}></MapViewer>
}

export default Map
