import axios from 'axios'
import qs from 'qs'

const API_URL = '/stores/'

// 검색된 편의점 정보 get
const getAllStore = async (storeId: string[]) => {
  const params = { id: [...storeId] }

  const response = await axios.get(API_URL, {
    params,
    paramsSerializer: {
      serialize: ({ id }) => qs.stringify({ id }, { arrayFormat: 'repeat' }),
    },
  })

  return response.data
}

// 하나의 편의점 정보 get
const getStore = async (storeId: string) => {
  const response = await axios.get(API_URL + storeId)

  return response.data
}

const StoreService = { getStore, getAllStore }

export default StoreService
