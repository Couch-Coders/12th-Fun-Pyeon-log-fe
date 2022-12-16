export interface ConvType extends kakao.maps.services.PlacesSearchResultItem {
  storeId: string
  starCount: number
  reviewCount: number
  keywords: string[]
}

export interface ConvState {
  stores: ConvType[]
  selectedStore: ConvType | null
  loading: boolean
  error: string
}
