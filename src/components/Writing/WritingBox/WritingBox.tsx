import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunButton from '@styles/FunButton'
import Select from '@components/common/Select/Select'
import StarBox from '@components/Writing/StarBox/StarBox'
import TextBox from '@components/Writing/TextBox/TextBox'
import { ITEMS } from '@utils/constants'
import {
  BtnBox,
  KeyBox,
  Keywords,
  WritingBoxWrapper,
} from './WritingBox.styles'

interface ReviewType {
  reviewContent: string
  starCount: number
  keywords: string[]
}

const WritingBox = () => {
  const navigate = useNavigate()
  const [review, setReview] = useState<ReviewType>({
    reviewContent: '',
    starCount: 0,
    keywords: [],
  })

  const [starCount, setStarCount] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [reviewContent, setReviewContent] = useState('')

  const submitReview = () => {
    setReview({
      ...review,
      reviewContent,
      starCount,
      keywords: selected,
    })
    // console.log(review)
  }

  return (
    <WritingBoxWrapper>
      <KeyBox>
        <StarBox setStarCount={setStarCount} />

        <Keywords>
          <>
            {ITEMS.map((el) => (
              <Select
                key={el.title}
                title={el.title}
                keywordArray={el.keywordArray}
                selected={selected}
                setSelected={setSelected}
                selectType={'keyword'}
              />
            ))}
          </>
        </Keywords>
      </KeyBox>

      <TextBox setReviewContent={setReviewContent} />

      <BtnBox>
        <FunButton
          name={'취소'}
          className="opposite"
          onClick={() => navigate(-1)}
        />
        <FunButton name={'게시하기'} onClick={submitReview} />
      </BtnBox>
    </WritingBoxWrapper>
  )
}

export default WritingBox
