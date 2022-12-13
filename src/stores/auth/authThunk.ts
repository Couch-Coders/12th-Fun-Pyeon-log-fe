import { createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '@services/authService'
import { AxiosError } from 'axios'

export const getUserThunk = createAsyncThunk(
  'authSlice/getUser',
  async (token: string, thunkApi) => {
    try {
      const res = await authService.signIn({ token })
      const displayName = res.data.split('@')[0]
      return { email: res.data, token, displayName }
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message)
      } else {
        throw error
      }
    }
  }
)
