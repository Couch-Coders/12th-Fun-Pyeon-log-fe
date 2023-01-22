import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '@services/authService'
import ErrorService from '@services/errorService'
import { UserStateType, UserType } from './authType'

const initialState: UserStateType = {
  user: null,
  userPostion: null,
  loading: false,
  error: '',
}

export const getUserThunk = createAsyncThunk(
  'authSlice/getUser',
  async (token: string, thunkApi) => {
    try {
      const userData = await AuthService.signIn({ token })
      const displayName = userData.email.split('@')[0]
      return {
        email: userData.email,
        token,
        displayName,
        imgUrl: userData.userImageUrl,
      }
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error)
      return thunkApi.rejectWithValue(message)
    }
  }
)

export const logOutUserThunk = createAsyncThunk(
  'authSlice/logOutUser',
  async (_, thunkApi) => {
    try {
      await AuthService.signOut()
    } catch (error) {
      const message = ErrorService.axiosErrorHandler(error)
      return thunkApi.rejectWithValue(message)
    }
  }
)

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPosition: (
      state,
      action: PayloadAction<{ lat: number; lng: number }>
    ) => {
      state.userPostion = action.payload
    },
    resetPosition: (state) => {
      state.userPostion = initialState.userPostion
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(
      getUserThunk.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
        state.loading = false
      }
    )
    builder.addCase(getUserThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
    builder.addCase(logOutUserThunk.pending, (state) => {
      state.loading = true
    })
    builder.addCase(logOutUserThunk.fulfilled, (state) => {
      state.user = null
      state.loading = false
    })
    builder.addCase(logOutUserThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export const { setUserPosition, resetPosition } = authSlice.actions

export default authSlice.reducer
