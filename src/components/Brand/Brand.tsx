import React, { useRef } from 'react'
import { BrandList } from './Brand.styles'
import { Title } from '@components/FilterBox/FilterBox.styles'
import { BRANDS } from '@utils/constants'

const BrandBox = () => {
  const brandRef = useRef<{ [idx: number]: HTMLLIElement | null }>({})

  const onClick = (idx: number) => {
    brandRef.current[idx]?.classList.toggle('on')
  }

  return (
    <div>
      <Title>브랜드</Title>
      <ul>
        {brands.map((brand, idx) => (
          <BrandList
            ref={(el) => (brandRef.current[idx] = el)}
            key={idx}
            onClick={() => onClick(idx)}
          >
            {brand}
          </BrandList>
        ))}
      </ul>
    </div>
  )
}

export default BrandBox
