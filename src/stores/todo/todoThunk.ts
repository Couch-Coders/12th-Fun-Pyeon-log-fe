import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { Post } from "./todoSlice";

const JSON_RANDOMAPI = "https://jsonplaceholder.typicode.com/posts?_limit=10";

export const getRandomData = createAsyncThunk(
  "todo/randomData",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(JSON_RANDOMAPI);
      console.log(response);
      return response.data as Post[];
    } catch (error) {
      return thunkApi.rejectWithValue((error as AxiosError).message);
    }
  }
);
