export interface ReviewType {
  reviewId: string
  reviewContent: string
  starCount: number
  createdDate: Date
  storeId: string
  user: string
  keywords: string[]
}

export interface ReviewState {
  reviews: ReviewType[]
  loading: boolean
  error: string
}
