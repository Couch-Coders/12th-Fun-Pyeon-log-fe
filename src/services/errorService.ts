import axios, { AxiosError } from 'axios'

const axiosErrorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    const message = errorController(error)
    return message
  }
  return error
}

const errorController = (error: AxiosError) => {
  const status = error.response?.status

  if (status === 401) {
    return '값이 잘못되었습니다.'
  } else if (status === 401) {
    return '토큰 값이 유효하지 않습니다.'
  } else if (status === 404) {
    return '리뷰가 존재하지 않습니다.'
  } else if (status === 403) {
    return '작성한 유저가 아닙니다.'
  }

  return error.message
}

const ErrorService = {
  axiosErrorHandler,
}

export default ErrorService
