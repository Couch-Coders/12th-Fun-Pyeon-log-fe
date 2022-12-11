import React, { forwardRef, ReactNode } from 'react'
import { MapViewer } from './Map.styles'

interface Props {
  children?: ReactNode
}

const Map = forwardRef<HTMLDivElement, Props>(function Map(props, ref) {
  return <MapViewer className="map" ref={ref}></MapViewer>
})

export default Map
