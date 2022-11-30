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

let nextId = 1;

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: nextId,
          text: action.payload,
        },
      ];
      nextId++;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState) => state.todos.todos;

export default todoSlice.reducer;
