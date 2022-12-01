import {
  createSlice,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { getMapThunk } from "./mapThunk";
import { MapData, MapState } from "./mapType";

const getMapThunk = createAsyncThunk("mapSlice/getMap", async () => {
  const config = {
    method: "GET",
    url: "https://dapi.kakao.com/v2/local/search/keyword.json?radius=500&query=강남구&category_group_code=CS2",
    headers: {
      Authorization: "KakaoAK eb1177956610bd356925fc8f724dc4d9",
    },
  };
  const resp = await axios(config);
  return resp.data.documents;
});

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

const initialState: MapState = {
  data: [],
  loading: false,
  error: false,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getMapThunk.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(
      getMapThunk.fulfilled,
      (state, action: PayloadAction<MapData[]>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = false;
      }
    );
    builder.addCase(getMapThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export { getMapThunk };
export default mapSlice.reducer;
