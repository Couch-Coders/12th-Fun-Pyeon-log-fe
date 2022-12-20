import { createSlice } from '@reduxjs/toolkit'
import { ListInfo } from './sortType'

const initialState: ListInfo = {
  searchWord: '',
  brandData: [],
  keywordData: [],
  sortType: 'distance',
}

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    saveSearchWord: (state, action) => {
      state.searchWord = action.payload
    },
    saveBrand: (state, action) => {
      state.brandData = action.payload
    },
    saveKeyword: (state, action) => {
      state.keywordData = action.payload
    },
    saveSortType: (state, action) => {
      state.sortType = action.payload
    },
  },
})

export const { saveSearchWord, saveBrand, saveKeyword, saveSortType } =
  sortSlice.actions
export default sortSlice.reducer
