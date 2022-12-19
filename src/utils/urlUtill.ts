const getReviewEditUrl = (reviewId: number) => {
  return `edit/${reviewId}`
}

const getReviewWriteUrl = (storeId: string) => {
  return `/stores/${storeId}/write`
}

const getStoreUrl = (storeId: string) => {
  return `stores/${storeId}`
}

const URLUtill = {
  getReviewEditUrl,
  getReviewWriteUrl,
  getStoreUrl,
}

export default URLUtill
