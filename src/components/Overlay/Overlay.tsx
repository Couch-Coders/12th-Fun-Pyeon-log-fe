import React from 'react'
import { Link } from 'react-router-dom'
import { getBrandImg } from '@services/markerImg'
import funlogImg from '../../assets/convImg/funlog.png'
import phone from '../../assets/phone.png'
import pin from '../../assets/pin.png'
import star from '../../assets/star.png'
import {
  OverlayContainer,
  StarReviewContainer,
  StoreInfo,
  DetailView,
} from './Overlay.styles'

export interface OverlayProps {
  placeName: string
  storeId: string
  address: string
  phoneNumber: string
  reviewCount: number
  starCount: number
}

const Overlay: React.FC<OverlayProps> = ({
  placeName,
  storeId,
  address,
  phoneNumber,
  reviewCount,
  starCount,
}) => {
  const addressEncode = encodeURIComponent(address)
  const storeBrand = placeName.split(' ')[0]
  const brandimg = getBrandImg(storeBrand)

  return (
    <OverlayContainer>
      <header>
        <img src={brandimg ?? funlogImg} alt="brand logo" />
        <h2>{placeName}</h2>
      </header>
      <StarReviewContainer>
        <div className="star">
          <img src={star} alt="star image" />
          {starCount}
        </div>
        <div className="review-count">리뷰 {reviewCount}개</div>
      </StarReviewContainer>
      <StoreInfo>
        <div className="address">
          <img src={pin} alt="pin image" />
          <p>{address}</p>
        </div>
        <div className="phone">
          <img src={phone} alt="phone image" />
          <p>{phoneNumber.length > 0 ? phoneNumber : '전화번호가 없습니다.'}</p>
        </div>
      </StoreInfo>
      <DetailView>
        <Link to={`/stores/${storeId}?address=${addressEncode}`}>상세보기</Link>
      </DetailView>
    </OverlayContainer>
  )
}

export default Overlay
