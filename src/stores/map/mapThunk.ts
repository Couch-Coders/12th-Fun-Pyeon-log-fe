import { createAsyncThunk } from '@reduxjs/toolkit'
import mapApi from './mapApi'

export const getMapThunk = createAsyncThunk(
  'mapSlice/getMap',
  async (search: string, thunkApi) => {
    try {
      const data = await mapApi.getMap(search)
      // const config = {
      //   method: "GET",
      //   url: "https://dapi.kakao.com/v2/local/search/keyword.json?radius=500&query=강남구&category_group_code=CS2",
      //   headers: {
      //     Authorization: "KakaoAK eb1177956610bd356925fc8f724dc4d9",
      //   },
      // };
      // const resp = await axios(config);
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)
