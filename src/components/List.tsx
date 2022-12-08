import React, { FC } from 'react'
import styled from 'styled-components'

const ListCon = styled.div`
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
      <ListCon>
        <p>{placeName}</p>
        <p>제품이 다양해요</p>
      </ListCon>
    </div>
  )
}

export default List
