import React, { useState, useEffect, useCallback } from 'react'
import { STAR_COUNT } from '@utils/constants'
import { StarFilled } from '@ant-design/icons'
import { Stars } from './StarBox.styles'

interface StarProps {
  starCount: number
  setStarCount: (starCount: number) => void
}

const StarBox: React.FC<StarProps> = ({ starCount, setStarCount }) => {
  const [clicked, setClicked] = useState([false, false, false, false, false])

  const clickStar = useCallback((idx: number) => {
    const clickState = [...clicked]
    for (let i = 0; i < 5; i++) {
      clickState[i] = i <= idx
    }
    setClicked(clickState)
  }, [])

  useEffect(() => {
    if (starCount) clickStar(starCount - 1)
  }, [starCount])

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
