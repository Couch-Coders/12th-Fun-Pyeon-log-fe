import React, { FC } from 'react'
import { ResultPropsType } from './MapContainer'
import styled from 'styled-components'

const Level = styled.p`
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 5;
`

export const Result: FC<ResultPropsType> = ({ level, lat, lng }) => {
  return (
    <Level>
      지도 레벨은{level}이고 중심 좌표는 위도 {lat} / 경도 {lng}입니다
    </Level>
  )
}
