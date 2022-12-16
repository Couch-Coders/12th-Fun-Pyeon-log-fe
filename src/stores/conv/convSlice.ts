import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import StoreService from '@services/storeService'
import { AxiosError } from 'axios'
import { ConvState, ConvType } from './convType'

const initialState: ConvState = {
  stores: [],
  selectedStore: null,
  loading: false,
  error: '',
}

// 검색된 전체 편의점에 대한 정보 가져오기
export const fetchAllStores = createAsyncThunk(
  'convStore/fetchAllStores',
  async (storeIds: string[], thunkApi) => {
    try {
      const stores = await StoreService.getAllStore(storeIds)
      console.log(stores)
      return stores
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

// 클릭한 한개의 편의점에 대한 정보 가져오기
export const fetchStoreInfo = createAsyncThunk(
  'convStore/fetchStore',
  async (storeId: string, thunkApi) => {
    try {
      const storeInfo = await StoreService.getStore(storeId)
      console.log(storeInfo)
      return storeInfo
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

const convSlice = createSlice({
  name: 'conv',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllStores.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchAllStores.fulfilled,
      (state, action: PayloadAction<ConvType[]>) => {
        state.loading = false
        state.stores = action.payload
      }
    )
    builder.addCase(fetchAllStores.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(fetchStoreInfo.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchStoreInfo.fulfilled,
      (state, action: PayloadAction<ConvType>) => {
        state.loading = false
        state.selectedStore = action.payload
      }
    )
    builder.addCase(fetchStoreInfo.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export default convSlice.reducer
