export interface ConvType extends kakao.maps.services.PlacesSearchResultItem {
  storeId: string
  starCount: number
  reviewCount: number
  keywordList: string[]
}

export interface ConvState {
  stores: ConvType[]
  sortedStores: ConvType[]
  selectedStore: ConvType | null
  loading: boolean
  error: string
}
