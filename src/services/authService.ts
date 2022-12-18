import axios from 'axios'

// const BASE_URL = 'https://jlvadtrbkq.us16.qoddiapp.com/'

interface SignInParam {
  token: string
}

const signIn = async ({ token }: SignInParam) => {
  const response = await axios.get('/users/me', {
    headers: { Authorization: `${token}` },
    withCredentials: true,
  })
  return response.data
}

const signOut = async () => {
  const response = await axios.delete('/users/me', {
    withCredentials: true,
  })
  return response
}

const AuthService = { signIn, signOut }

export default AuthService
