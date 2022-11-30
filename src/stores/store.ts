import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import todoReducer from "./todo/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
