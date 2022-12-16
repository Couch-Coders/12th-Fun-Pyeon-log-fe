import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { getMapThunk } from './mapThunk'
import { MapData, MapState } from './mapType'

const initialState: MapState = {
  data: [],
  sortData: [],
  loading: false,
  error: false,
}

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    getData: (
      state,
      action: PayloadAction<kakao.maps.services.PlacesSearchResultItem[]>
    ) => {
      state.data = action.payload
      // console.log(action.payload)
    },
    removeData: (state) => {
      state.data = []
    },
    sortData: (
      state,
      action: PayloadAction<kakao.maps.services.PlacesSearchResultItem[]>
    ) => {
      state.data = action.payload
    },
  },
  extraReducers(builder) {
    // builder.addCase(getMapThunk.pending, (state) => {
    //   state.loading = true
    //   state.error = false
    // })
    // builder.addCase(
    //   getMapThunk.fulfilled,
    //   (state, action: PayloadAction<MapData[]>) => {
    //     state.data = action.payload
    //     state.loading = false
    //     state.error = false
    //   }
    // )
    // builder.addCase(getMapThunk.rejected, (state) => {
    //   state.loading = false
    //   state.error = true
    // })
  },
})

// export { getMapThunk }
export const { getData, removeData, sortData } = mapSlice.actions
export default mapSlice.reducer
