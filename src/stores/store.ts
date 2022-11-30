import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import todoReducer from './todo/todoSlice';
import mapReducer from './map/mapSlice';

export const store = configureStore({
	reducer: {
		todos: todoReducer,
		map: mapReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
