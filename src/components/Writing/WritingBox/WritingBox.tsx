import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FunButton from '@styles/FunButton'
import Select from '@components/common/Select/Select'
import StarBox from '@components/Writing/StarBox/StarBox'
import TextBox from '@components/Writing/TextBox/TextBox'
import { FACILITIES, MOOD, PRODUCT } from '@utils/constants'
import {
  BtnBox,
  KeyBox,
  Keywords,
  WritingBoxWrapper,
} from './WritingBox.styles'

const WritingBox = () => {
  const navigate = useNavigate()

  const [starCount, setStarCount] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [reviewContent, setReviewContent] = useState('')

  return (
    <WritingBoxWrapper>
      <KeyBox>
        <StarBox setStarCount={setStarCount} />

        <Keywords>
          <Select
            title={'제품'}
            keyword={PRODUCT}
            selected={selected}
            setSelected={setSelected}
            selectType={'keyword'}
          />
          <Select
            title={'분위기'}
            keyword={MOOD}
            selected={selected}
            setSelected={setSelected}
            selectType={'keyword'}
          />
          <Select
            title={'편의시설'}
            keyword={FACILITIES}
            selected={selected}
            setSelected={setSelected}
            selectType={'keyword'}
          />
        </Keywords>
      </KeyBox>

      <TextBox setReviewContent={setReviewContent} />

      <BtnBox>
        <FunButton
          name={'취소'}
          className="opposite"
          onClick={() => navigate('/')} // 추후 수정
        />
        <FunButton name={'게시하기'} />
      </BtnBox>
    </WritingBoxWrapper>
  )
}

export default WritingBox
