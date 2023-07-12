import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import Overlay, { OverlayProps } from '@components/Overlay/Overlay'
import { RootState } from '@stores/store'

// const clickedStore = {
//   placeName: 'ASef',
//   storeId: 'fefsf',
//   address: 'safasefassgasg',
//   phoneNumber: '12312-14123-123',
//   reviewCount: 1,
//   starCount: 1,
// }
const Tooltip = () => {
  const clickedStore = useSelector(
    (state: RootState) => state.conv.clickedStore
  )
  const [clickStore, setClickStore] = useState<OverlayProps | null>(null)

  useEffect(() => {
    if (clickedStore) {
      setClickStore(clickedStore)
    }
  }, [clickedStore])

  if (!clickStore) {
    return null
  }

  const modalRoot = document.getElementById(`kakao-overlay`)
  if (!modalRoot) {
    return null
  }

  return createPortal(
    <Overlay
      placeName={clickStore.placeName}
      storeId={clickStore.storeId}
      address={clickStore.address}
      phoneNumber={clickStore.phoneNumber}
      reviewCount={clickStore.reviewCount}
      starCount={clickStore.starCount}
    />,
    modalRoot
  )
}

export default Tooltip
