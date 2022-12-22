export interface ListInfo {
  searchWord: string
  searchedCoord: { lat: number; lng: number } | null
  brandData: string[]
  keywordData: string[]
  sortType: string
}
