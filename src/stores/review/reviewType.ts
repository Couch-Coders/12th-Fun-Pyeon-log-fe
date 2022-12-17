export interface ReviewType {
  reviewEntryNo: number
  reviewContent: string
  starCount: number
  createdDate: string
  storeId: string
  userEmail: string
  keywords: string[]
}

export interface ReviewState {
  reviews: ReviewType[]
  selectedReview?: ReviewType | null
  loading: boolean
  error: string
}

export interface WriteType {
  reviewContent: string
  starCount: number
  keywords: string[]
}
