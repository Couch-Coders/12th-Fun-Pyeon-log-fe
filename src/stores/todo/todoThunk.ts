import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { Post } from "./todoSlice";

const JSON_RANDOMAPI = "https://jsonplaceholder.typicode.com/posts?_limit=10";

export const getRandomData = createAsyncThunk(
  "todo/randomData",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<Post[]>(JSON_RANDOMAPI);
      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
