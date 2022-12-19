import { AxiosError } from 'axios'

const axiosErrorHandler = (error: any) => {
  if (error instanceof AxiosError) {
    return error
  }
  throw error
}

const ErrorService = {
  axiosErrorHandler,
}

export default ErrorService
