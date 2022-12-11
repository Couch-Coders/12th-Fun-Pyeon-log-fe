import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

import { ReviewListWrapper, ReviewTop, NameNCount } from './ReviewList.styles'

const ReviewList = () => {
  return (
    <ReviewListWrapper>
      <ReviewTop>
        <NameNCount>
          <h1>REVIEW</h1>
          <div className="count">
            <PlusOutlined />
            <p>23</p>
          </div>
        </NameNCount>
        <div className="button">
          <button>작성하기</button>
        </div>
      </ReviewTop>
      <div className="list-container"></div>
    </ReviewListWrapper>
  )
}

export default ReviewList
