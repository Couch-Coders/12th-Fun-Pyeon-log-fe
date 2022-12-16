export interface MapData {
  address_name: string
  category_name: string
  distance?: string
  id: string
  phone?: string
  place_name: string
  road_address_name: string
  x: string
  y: string
}

export interface MapState {
  data: kakao.maps.services.PlacesSearchResultItem[]
  sortData: kakao.maps.services.PlacesSearchResultItem[]
  loading: boolean
  error: boolean
}
