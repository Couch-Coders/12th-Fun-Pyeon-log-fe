import axios from 'axios'
import { MapData } from './mapType'

const KAKAO_API = 'eb1177956610bd356925fc8f724dc4d9'

const getMap = async (search: string) => {
  const config = {
    headers: {
      Authorization: `KakaoAK ${KAKAO_API}`,
    },
  }
  const resp = await axios.get<{ documents: MapData[] }>(
    `https://dapi.kakao.com/v2/local/search/keyword.json?radius=500&query=${search}&category_group_code=CS2`,
    config
  )
  console.log(resp)

  return resp.data.documents
}

const mapApi = {
  getMap,
}

export default mapApi
