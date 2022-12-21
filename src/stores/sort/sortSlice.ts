import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListInfo } from './sortType'

const initialState: ListInfo = {
  searchWord: '',
  searchLocation: null,
  brandData: [],
  keywordData: [],
  sortType: 'distance',
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    saveSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload
    },
    saveSearchLocation: (
      state,
      action: PayloadAction<{ lat: number; lng: number } | null>
    ) => {
      state.searchLocation = action.payload
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

export const {
  saveSearchWord,
  saveBrand,
  saveKeyword,
  saveSortType,
  saveSearchLocation,
} = sortSlice.actions
export default sortSlice.reducer
