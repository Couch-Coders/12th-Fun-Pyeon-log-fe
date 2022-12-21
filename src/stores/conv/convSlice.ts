import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import ErrorService from '@services/errorService'
import KakaoService from '@services/kakaoService'
import StoreService from '@services/storeService'
import { calcDistance } from '@utils/calc'
import { ConvState, ConvType } from './convType'

const initialState: ConvState = {
  stores: [],
  sortedStores: [],
  selectedStore: null,
  loading: false,
  error: '',
}

// 검색된 전체 편의점에 대한 정보 가져오기
export const fetchAllStores = createAsyncThunk(
  'convStore/fetchAllStores',
  async (
    mapInfo: {
      mapData: kakao.maps.services.PlacesSearchResult
      map: kakao.maps.Map
    },
    thunkApi
  ) => {
    const { mapData, map } = mapInfo
    try {
      const storeIds = mapData.map((result) => result.id)
      const stores = await StoreService.getAllStore(storeIds)
      const storeData = stores.map((data) => {
        const [matchStore] = mapData.filter(
          (store) => store.id === data.storeId
        )

        const customDistance = calcDistance(
          map,
          Number(matchStore.y),
          Number(matchStore.x)
        )
        return { ...data, ...matchStore, customDistance }
      })

      if (storeData[0].distance) {
        return storeData.sort((a, b) => Number(a.distance) - Number(b.distance))
      } else {
        return storeData.sort(
          (a, b) => Number(a.customDistance) - Number(b.customDistance)
        )
      }
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error)
      return thunkApi.rejectWithValue(message)
    }
  }
)

// 클릭한 한개의 편의점에 대한 정보 가져오기
export const fetchStoreInfo = createAsyncThunk(
  'convStore/fetchStore',
  async (storeData: { storeId: string; decodedStore: string }, thunkApi) => {
    try {
      const { storeId, decodedStore } = storeData
      const searchedStore = KakaoService.searchOneStore(decodedStore, storeId)
      const storeInfo = await StoreService.getStore(storeId)
      return { ...searchedStore[0], ...storeInfo }
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error)
      return thunkApi.rejectWithValue(message)
    }
  }
)

const convSlice = createSlice({
  name: 'conv',
  initialState,
  reducers: {
    setSortStores: (state, action: PayloadAction<ConvType[]>) => {
      state.sortedStores = action.payload
    },
    reviewSort: (state) => {
      state.sortedStores.sort((a, b) => b.reviewCount - a.reviewCount)
    },
    starSort: (state) => {
      state.sortedStores.sort((a, b) => b.starCount - a.starCount)
    },
    distanceSort: (state) => {
      if (state.sortedStores[0].distance) {
        state.sortedStores.sort(
          (a, b) => Number(a.distance) - Number(b.distance)
        )
      } else if (state.sortedStores[0].customDistance) {
        state.sortedStores.sort((a, b) => a.customDistance - b.customDistance)
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllStores.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchAllStores.fulfilled,
      (state, action: PayloadAction<ConvType[]>) => {
        state.loading = false
        state.stores = action.payload
        state.sortedStores = action.payload
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

export const { setSortStores, reviewSort, starSort, distanceSort } =
  convSlice.actions

export default convSlice.reducer
