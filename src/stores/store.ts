import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import mapReducer from './map/mapSlice'
import userReducer from './auth/authSlice'
import reviewReducer from './review/reivewSlice'
import convReducer from './conv/convSlice'

export const store = configureStore({
  reducer: {
    map: mapReducer,
    user: userReducer,
    review: reviewReducer,
    conv: convReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
