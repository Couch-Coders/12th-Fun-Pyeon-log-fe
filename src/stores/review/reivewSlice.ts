import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ReviewState, ReviewType } from './reviewType'
import { AxiosError } from 'axios'
import ReviewService from '@services/reviewService'

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: '',
}

export const fetchAllReviews = createAsyncThunk(
  'review/fetchAllReview',
  async (storeId: string, thunkApi) => {
    try {
      const reviews = await ReviewService.getAllReviews(storeId)
      console.log(reviews)
      return reviews
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllReviews.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchAllReviews.fulfilled,
      (state, action: PayloadAction<ReviewType[]>) => {
        state.loading = false
        state.reviews = action.payload
      }
    )
    builder.addCase(fetchAllReviews.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

// export const {} = reviewSlice.actions
export default reviewSlice.reducer
