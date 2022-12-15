import React, { useRef } from 'react'
import { CheckSquareFilled } from '@ant-design/icons'
import { KeywordGroup, KeywordList, KeywordName } from './Keywords.styles'

interface KeywordProps {
  title: string
  keyword: string[]
}

const Keywords: React.FC<KeywordProps> = ({ title, keyword }) => {
  const listRef = useRef<{ [idx: number]: HTMLLIElement | null }>({})

  const toggleOn = (idx: number) => {
    listRef.current[idx]?.classList.toggle('on')
  }

  return (
    <KeywordGroup>
      <h3>{title}</h3>
      <ul>
        {keyword.map((item, idx) => (
          <KeywordList
            key={item}
            ref={(el) => (listRef.current[idx] = el)}
            onClick={() => toggleOn(idx)}
          >
            <CheckSquareFilled />
            <KeywordName>{item}</KeywordName>
          </KeywordList>
        ))}
      </ul>
    </KeywordGroup>
  )
}

export default Keywords
