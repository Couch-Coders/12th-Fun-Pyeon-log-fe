import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Select from '@components/common/Select/Select'
import FunButton from '@components/styles/FunButton'
import StarBox from '@components/Writing/StarBox/StarBox'
import TextBox from '@components/Writing/TextBox/TextBox'
import { createReview, updateReview } from '@stores/review/reivewSlice'
import { ReviewType, WriteType } from '@stores/review/reviewType'
import { useAppDispatch } from '@stores/store'
import { ITEMS } from '@utils/constants'

import {
  BtnBox,
  KeyBox,
  Keywords,
  WritingBoxWrapper,
} from './WritingBox.styles'

interface EditProps {
  isEdit?: boolean
  originReview?: ReviewType
}

const WritingBox: React.FC<EditProps> = ({ isEdit, originReview }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { storeId } = useParams()

  const [starCount, setStarCount] = useState<number>(0)
  const [selected, setSelected] = useState<string[]>([])
  const [reviewContent, setReviewContent] = useState<string>('')

  const reviewId = originReview?.reviewEntryNo

  const submitReview = async () => {
    if (reviewContent.length === 0) {
      return alert('리뷰를 작성해주세요')
    }

    if (storeId) {
      const reviewData: WriteType = {
        reviewContent,
        starCount,
        keywords: selected,
      }

      if (isEdit && reviewId) {
        await dispatch(updateReview({ reviewData, storeId, reviewId }))
        navigate(-1)
      } else {
        await dispatch(createReview({ reviewData, storeId }))
        navigate(-1)
      }
    }
  }

  useEffect(() => {
    if (isEdit && originReview) {
      setStarCount(originReview.starCount)
      setSelected(originReview.keywords)
      setReviewContent(originReview.reviewContent)
    }
  }, [isEdit, originReview])

  return (
    <WritingBoxWrapper>
      <KeyBox>
        <StarBox starCount={starCount} setStarCount={setStarCount} />

        <Keywords>
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
        </Keywords>
      </KeyBox>

      <TextBox
        reviewContent={reviewContent}
        setReviewContent={setReviewContent}
      />

      <BtnBox>
        <FunButton
          name={'취소'}
          className="opposite"
          onClick={() => navigate(-1)}
        />

        <FunButton
          name={isEdit ? '수정하기' : '게시하기'}
          onClick={submitReview}
        />
      </BtnBox>
    </WritingBoxWrapper>
  )
}

export default WritingBox
