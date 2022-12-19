import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Select from '@components/common/Select/Select'
import StarBox from '@components/Writing/StarBox/StarBox'
import TextBox from '@components/Writing/TextBox/TextBox'
import { WriteType } from '@stores/review/reviewType'
import { useAppDispatch } from '@stores/store'
import { createReview } from '@stores/review/reivewSlice'

import { ITEMS } from '@utils/constants'
import FunButton from '@styles/FunButton'

import {
  BtnBox,
  KeyBox,
  Keywords,
  WritingBoxWrapper,
} from './WritingBox.styles'
const WritingBox = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { storeId } = useParams()

  const [starCount, setStarCount] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [reviewContent, setReviewContent] = useState('')

  const submitReview = () => {
    if (reviewContent.length === 0) {
      return alert('리뷰를 작성해주세요')
    }
    if (storeId) {
      const reviewData: WriteType = {
        reviewContent,
        starCount,
        keywords: selected,
      }
      console.log(reviewData)
      dispatch(createReview({ reviewData, storeId })).then(() => navigate(-1))
    }
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
