export interface MapData {
  address_name: string;
  category_name: string;
  distance?: string;
  id: string;
  phone?: string;
  place_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface MapState {
  data: MapData[];
  loading: boolean;
  error: boolean;
}