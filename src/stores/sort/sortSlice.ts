import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListInfo } from './sortType'

const initialState: ListInfo = {
  searchWord: '',
  searchedCoord: null,
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

export const {
  saveSearchWord,
  saveBrand,
  saveKeyword,
  saveSortType,
  setSearchedCoord,
} = sortSlice.actions
export default sortSlice.reducer
