export interface ListInfo {
  searchWord: string
  searchLocation: { lat: number; lng: number } | null
  brandData: string[]
  keywordData: string[]
  sortType: string
}
