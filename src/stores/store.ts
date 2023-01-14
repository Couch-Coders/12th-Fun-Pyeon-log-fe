import { useDispatch } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './auth/authSlice'
import convReducer from './conv/convSlice'
import reviewReducer from './review/reivewSlice'
import sortReducer from './sort/sortSlice'

const rootReducer = combineReducers({
  sort: sortReducer,
  user: userReducer,
  review: reviewReducer,
  conv: convReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: Array<keyof RootState>
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['sort', 'review', 'user', 'conv'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const useAppDispatch: () => AppDispatch = useDispatch
export const persistor = persistStore(store)

export default store
