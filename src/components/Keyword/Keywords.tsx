import React, { useRef } from 'react'
import { CheckSquareFilled } from '@ant-design/icons'
import { KeywordGroup, KeywordList, KeywordName } from './Keywords.styles'

interface KeywordProps {
  name: string
  array: string[]
}

const Keywords = ({ name, array }: KeywordProps) => {
  const listRef = useRef<HTMLLIElement[] | null[]>([])

  const onClick = (idx: number) => {
    listRef.current[idx]?.classList.toggle('on')
  }

  return (
    <KeywordGroup>
      <h3>{name}</h3>
      <ul>
        {array.map((keyword, idx) => (
          <KeywordList
            key={idx}
            ref={(el) => (listRef.current[idx] = el)}
            onClick={() => onClick(idx)}
          >
            <CheckSquareFilled />
            <KeywordName>{keyword}</KeywordName>
          </KeywordList>
        ))}
      </ul>
    </KeywordGroup>
  )
}

export default Keywords
