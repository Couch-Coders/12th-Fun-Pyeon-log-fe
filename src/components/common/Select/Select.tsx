import React from 'react'
import { CheckSquareFilled } from '@ant-design/icons'
import { SelectBox } from './Select.styles'

interface KeywordProps {
  title?: string
  keyword: string[]
  selected: string[]
  setSelected: (selected: string[]) => void
  selectType: 'brand' | 'keyword' | 'checkbox'
}

const Select: React.FC<KeywordProps> = ({
  title,
  keyword,
  selected,
  setSelected,
  selectType,
}) => {
  const selectToggle = (selected: string[], item: string) => {
    let newArray
    if (!selected.includes(item)) {
      newArray = [...selected, item]
      setSelected(newArray)
    } else {
      newArray = selected.filter((e) => e !== item)
      setSelected(newArray)
    }
  }

  return (
    <SelectBox className={selectType}>
      {title ? <p>{title}</p> : ''}
      <ul>
        {keyword.map((item) => (
          <li
            key={item}
            onClick={() => {
              selectToggle(selected, item)
            }}
            className={selected.includes(item) ? 'on' : ''}
          >
            {selectType === 'checkbox' ? <CheckSquareFilled /> : ''}
            <span className="desc">{item}</span>
          </li>
        ))}
      </ul>
    </SelectBox>
  )
}

export default Select
