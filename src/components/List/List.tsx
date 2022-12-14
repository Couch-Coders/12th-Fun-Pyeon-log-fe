import React from 'react'
import { StarFilled } from '@ant-design/icons'
import { ConBox, Title, Content } from './List.styles'

interface ListProps {
  placeName: string
}

const List: React.FC<ListProps> = ({ placeName }) => {
  return (
    <ConBox>
      <Title>
        <h2>{placeName}</h2>
        <div className="star_box">
          <StarFilled />
          <span>4.7</span>
        </div>
      </Title>

      <Content>
        <ul>
          <li>
            <span>제품이 다양해요</span>
          </li>
          <li>
            <span>트렌디한 상품이 많아요</span>
          </li>
          <li>
            <span>접근성이 좋아요</span>
          </li>
        </ul>

        <span className="review">리뷰 40개</span>
      </Content>
    </ConBox>
  )
}

export default List
