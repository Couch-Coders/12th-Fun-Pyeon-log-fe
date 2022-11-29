import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@stores/store";

interface Todo {
  id: number;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

// Define the initial state using that type
const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    increment: (state) => {},

    incrementByAmount: (state, action: PayloadAction<number>) => {},
  },
});

export const { increment, incrementByAmount } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default todoSlice.reducer;
