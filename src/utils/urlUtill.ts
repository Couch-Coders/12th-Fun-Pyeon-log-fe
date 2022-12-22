const getReviewEditUrl = (reviewId: number) => `edit/${reviewId}`

const getReviewWriteUrl = (storeId: string) => `/stores/${storeId}/write`

const getStoreUrl = (storeId: string, storeName: string) => {
  const encodedStoreName = encodeURI(storeName)
  return `/stores/${storeId}?store=${encodedStoreName}`
}

const URLUtill = {
  getReviewEditUrl,
  getReviewWriteUrl,
  getStoreUrl,
}

export default URLUtill
