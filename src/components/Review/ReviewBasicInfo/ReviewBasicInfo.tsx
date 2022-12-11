import React from 'react'
import {
  ConvImgWrapper,
  InfoContainer,
  ConvInfo,
  KeywordBox,
  StarPoint,
} from './ReviewBasicInfo.styles'
import GsImg from '../../../assets/convImg/gs.png'
import cuImg from '../../../assets/convImg/cu.png'
import { PhoneFilled, PushpinFilled, StarFilled } from '@ant-design/icons'

const ReviewBasicInfo = () => {
  return (
    <InfoContainer>
      <ConvImgWrapper>
        <img src={GsImg} />
      </ConvImgWrapper>

      <ConvInfo>
        <h1>GS25 땡땡점</h1>
        <p>
          <span>
            <PushpinFilled /> 서울시 어쩌구 무슨무슨로 2-1
          </span>
          <span>
            <PhoneFilled />
            02-525-2525
          </span>
        </p>
        <KeywordBox>
          <ul>
            <li>
              <span>제품이 다양해요</span>
            </li>
            <li>
              <span>제품이 다양해요</span>
            </li>
            <li>
              <span>제품이 다양해요</span>
            </li>
            <li>
              <span>제품이 다양해요</span>
            </li>
            <li>
              <span>제품이 다양해요</span>
            </li>
          </ul>
        </KeywordBox>
      </ConvInfo>
      <StarPoint>
        <StarFilled />
        <p>4.6 / 5</p>
      </StarPoint>
    </InfoContainer>
  )
}

export default ReviewBasicInfo
