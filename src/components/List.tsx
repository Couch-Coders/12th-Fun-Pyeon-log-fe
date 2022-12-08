import React, { FC } from 'react'
import styled from 'styled-components'

const ConBox = styled.div`
  border: 1px solid #222;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
`
interface ListProps {
  placeName: string
}

const List: FC<ListProps> = ({ placeName }) => {
  return (
    <div>
      <ConBox>
        <p>{placeName}</p>
        <p>제품이 다양해요</p>
      </ConBox>
    </div>
  )
}

export default List
