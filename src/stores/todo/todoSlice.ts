import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@stores/store";
import { getRandomData } from "./todoThunk";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  text: string;
}
// type KnownError = {
//   errorMessage : string;
// }

interface TodoinitalState {
  todos: Todo[];
  randata: null | Post[];
  error: null | string;
  loading: boolean;
}

let nextId = 1;

// Define the initial state using that type
const initialState: TodoinitalState = {
  todos: [],
  randata: null,
  error: null,
  loading: false,
};

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
      nextId += 1;
    },

    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(getRandomData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getRandomData.fulfilled,
      (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.randata = action.payload;
      }
    );
    builder.addCase(getRandomData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? null;
    });
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectTodo = (state: RootState): TodoinitalState => state.todos;

export default todoSlice.reducer;
