import React from 'react'
import { CheckSquareFilled } from '@ant-design/icons'
import { SelectBox } from './Select.styles'

interface KeywordProps {
  title?: string
  keywordArray: string[]
  selected: string[]
  setSelected: (selected: string[]) => void
  selectType: 'brand' | 'keyword' | 'checkbox'
}

const Select: React.FC<KeywordProps> = ({
  title,
  keywordArray,
  selected,
  setSelected,
  selectType,
}) => {
  const selectToggle = (selected: string[], item: string) => {
    const newArray = (() => {
      if (!selected.includes(item)) {
        return [...selected, item]
      } else {
        return selected.filter((e) => e !== item)
      }
    })()
    setSelected(newArray)
  }

  return (
    <SelectBox className={selectType}>
      {title && <p>{title}</p>}
      <ul>
        {keywordArray.map((item) => (
          <li
            key={item}
            onClick={() => {
              selectToggle(selected, item)
            }}
            className={selected.includes(item) ? 'on' : ''}
          >
            {selectType === 'checkbox' && <CheckSquareFilled />}
            <span className="desc">{item}</span>
          </li>
        ))}
      </ul>
    </SelectBox>
  )
}

export default Select
