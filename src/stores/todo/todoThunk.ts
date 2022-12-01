import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import type { Post } from "./todoSlice";

const JSON_RANDOMAPI = "https://jsonplaceholder.typicode.com/posts?_limit=10";

export const getRandomData = createAsyncThunk( //  fetchRandomData
  "todo/randomData",
  async (_, thunkApi) => {
    try {
      const response = await axios.get<Post[]>(JSON_RANDOMAPI);
      return response.data ;
    } catch (error) {
      if(error instanceof AxiosError){
        return thunkApi.rejectWithValue(error.message);
      }else{
        throw error
      }
    }
  }
);
