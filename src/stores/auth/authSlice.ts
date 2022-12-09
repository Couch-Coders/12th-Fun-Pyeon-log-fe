import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getUserThunk } from './authThunk'

export interface UserType {
  token: string
  email: string
}

interface UserStateType {
  user: UserType | null
  loading: boolean
  error: string
}

const initialState: UserStateType = {
  user: null,
  loading: false,
  error: '',
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(getUserThunk.pending, (state, action) => {
      state.loading = true
      state.error = ''
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
  },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer
