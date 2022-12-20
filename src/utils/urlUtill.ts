const getReviewEditUrl = (storeId: string, reviewId: number) =>
  `/stores/${storeId}/edit/${reviewId}`

const getReviewWriteUrl = (storeId: string) => `/stores/${storeId}/write`

const getStoreUrl = (storeId: string) => `/stores/${storeId}`

const URLUtill = {
  getReviewEditUrl,
  getReviewWriteUrl,
  getStoreUrl,
}

export default URLUtill
