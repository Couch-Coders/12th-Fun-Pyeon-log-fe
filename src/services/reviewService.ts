import { ReviewType } from '@stores/review/reviewType'
import axios from 'axios'
const API_URL = '/stores/'

const getAllReviews = async (storeId: string) => {
  const params = { page: 0, size: 10 }
  const response = await axios.get<ReviewType[]>(
    API_URL + storeId + `/reviews`,
    { params }
  )
  return response.data
}

const ReviewService = { getAllReviews }

export default ReviewService
