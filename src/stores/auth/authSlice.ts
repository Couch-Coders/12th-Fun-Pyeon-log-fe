import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { UserStateType, UserType } from './authType'
import AuthService from '@services/authService'
import { AxiosError } from 'axios'

const initialState: UserStateType = {
  user: null,
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
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

export const logOutUserThunk = createAsyncThunk(
  'authSlice/logOutUser',
  async (_, thunkApi) => {
    try {
      const userData = await AuthService.signOut()
      console.log(userData)
      return
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(
      getUserThunk.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
        state.loading = false
        state.error = ''
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
      state.error = ''
    })
    builder.addCase(logOutUserThunk.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message ?? ''
    })
  },
})

export default authSlice.reducer
