import { ReviewType, WriteType } from '@stores/review/reviewType'
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

const createReview = async (reviewData: WriteType, storeId: string) => {
  const response = await axios.post(
    API_URL + storeId + `/reviews`,
    reviewData,
    {
      withCredentials: true,
    }
  )
  return response.data
}

const updateReview = async (
  reviewData: WriteType,
  storeId: string,
  reviewId: number
) => {
  const response = await axios.put(
    API_URL + `${storeId}/reviews/${reviewId}`,
    reviewData,
    {
      withCredentials: true,
    }
  )
  return response.data
}

const deleteReview = async (storeId: string, reviewId: number) => {
  const response = await axios.delete(
    API_URL + `${storeId}/reviews/${reviewId}`,
    {
      withCredentials: true,
    }
  )
  return response.data
}

const ReviewService = {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
}

export default ReviewService
