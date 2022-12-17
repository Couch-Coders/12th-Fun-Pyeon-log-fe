import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { ReviewState, ReviewType, WriteType } from './reviewType'
import { AxiosError } from 'axios'
import ReviewService from '@services/reviewService'

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: '',
}

export const fetchAllReviews = createAsyncThunk(
  'review/fetchAll',
  async (storeId: string, thunkApi) => {
    try {
      return await ReviewService.getAllReviews(storeId)
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

export const createReview = createAsyncThunk(
  'review/create',
  async (review: { reviewData: WriteType; storeId: string }, thunkApi) => {
    const { reviewData, storeId } = review
    try {
      return await ReviewService.createReview(reviewData, storeId)
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

export const updateReview = createAsyncThunk(
  'review/update',
  async (
    review: { reviewData: WriteType; storeId: string; reviewId: number },
    thunkApi
  ) => {
    const { reviewData, storeId, reviewId } = review
    try {
      return await ReviewService.updateReview(reviewData, storeId, reviewId)
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

export const deleteReview = createAsyncThunk(
  'review/delete',
  async (deleteReviewInfo: { storeId: string; reviewId: number }, thunkApi) => {
    const { storeId, reviewId } = deleteReviewInfo
    try {
      return await ReviewService.deleteReview(storeId, reviewId)
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
    builder.addCase(createReview.pending, (state) => {
      state.loading = true
    })
    builder.addCase(createReview.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(createReview.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(updateReview.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateReview.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(updateReview.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true
    })
    builder.addCase(deleteReview.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

// export const {} = reviewSlice.actions
export default reviewSlice.reducer
