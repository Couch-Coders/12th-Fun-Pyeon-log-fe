import React, { useState, useEffect } from 'react'
import { StarFilled } from '@ant-design/icons'
import { STAR_COUNT } from '@utils/constants'
import { Stars } from './StarBox.styles'

interface StarProps {
  setStarCount: (starCount: number) => void
}

const StarBox = ({ setStarCount }: StarProps) => {
  const [clicked, setClicked] = useState([false, false, false, false, false])

  const clickStar = (idx: number) => {
    const clickState = [...clicked]
    for (let i = 0; i < 5; i++) {
      clickState[i] = i <= idx
    }
    setClicked(clickState)
  }

  useEffect(() => {
    const score = clicked.filter(Boolean).length
    setStarCount(score)
  }, [clicked])

  return (
    <Stars>
      <p>별점</p>
      <ul>
        {STAR_COUNT.map((el) => (
          <StarFilled
            key={el}
            onClick={() => {
              clickStar(el)
            }}
            className={clicked[el] ? 'clicked' : ''}
          />
        ))}
      </ul>
    </Stars>
  )
}

export default StarBox
