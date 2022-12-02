import React, { FC } from 'react'
import { ResultPropsType } from './MapContainer'

export const Result: FC<ResultPropsType> = ({ level, lat, lng }) => {
  return (
    <div>
      <p>지도 레벨은{level}이고</p>
      <p>
        중심 좌표는 위도 {lat} / 경도 {lng}입니다
      </p>
    </div>
  )
}
