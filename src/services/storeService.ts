import { ConvType } from '@stores/conv/convType'
import axios from 'axios'
import qs from 'qs'

// 검색된 편의점 정보 get
const getAllStore = async (storeId: string[]) => {
  const params = { id: [...storeId] }

  const response = await axios.get<ConvType[]>('/api/stores/', {
    params,
    paramsSerializer: {
      serialize: ({ id }) => qs.stringify({ id }, { arrayFormat: 'repeat' }),
    },
  })

  return response.data
}

// 하나의 편의점 정보 get
const getStore = async (storeId: string) => {
  const response = await axios.get(`/api/stores/${storeId}`)

  return response.data
}

const StoreService = { getStore, getAllStore }

export default StoreService
