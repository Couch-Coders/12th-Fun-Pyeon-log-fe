import { OverlayProps } from '@components/Overlay/Overlay'

export interface ConvType extends kakao.maps.services.PlacesSearchResultItem {
  storeId: string
  starCount: number
  reviewCount: number
  keywordList: string[]
  customDistance: number
}

export interface ConvState {
  stores: ConvType[]
  sortedStores: ConvType[]
  selectedStore: ConvType | null
  clickedStore: OverlayProps | null
  loading: boolean
  error: string
}
