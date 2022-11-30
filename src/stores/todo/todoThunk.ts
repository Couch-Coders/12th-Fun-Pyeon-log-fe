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

export const getKakaoData = createAsyncThunk(
  "todo/kakaoData",
  async (data, thunkApi) => {
    try {
      const config = {
        headers: {
          Authorization: `KakaoAK cdc459952a6efba27d7d8cdb4b96f3d7`,
        },
      };
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/category.json?category_group_code=CS2&page=1&size=15&sort=accuracy&x=127.06128796043436+&y=+37.156477916912515",
        config
      );

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
