import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ListInfo {
  searchedCoord: { lat: number; lng: number } | null
  brandData: string[]
  keywordData: string[]
  sortType: string
}
const initialState: ListInfo = {
  searchedCoord: null,
  brandData: [],
  keywordData: [],
  sortType: 'distance',
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSearchedCoord: (
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>
    ) => {
      state.searchedCoord = action.payload
    },
    saveBrand: (state, action: PayloadAction<string[]>) => {
      state.brandData = action.payload
    },
    saveKeyword: (state, action: PayloadAction<string[]>) => {
      state.keywordData = action.payload
    },
    saveSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload
    },
  },
})

export const { saveBrand, saveKeyword, saveSortType, setSearchedCoord } =
  sortSlice.actions
export default sortSlice.reducer
