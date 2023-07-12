import axios from 'axios'

// const BASE_URL = 'https://jlvadtrbkq.us16.qoddiapp.com/'

type SignInParam = string

interface UserDTO {
  email: string
  userImageUrl: string
}

const signIn = async (token: SignInParam) => {
  const response = await axios.get('/api/users/me', {
    headers: { Authorization: `${token}` },
    withCredentials: true,
  })
  return response.data as UserDTO
}

const signOut = async () => {
  const response = await axios.delete('/api/users/me', {
    withCredentials: true,
  })
  return response
}

const AuthService = { signIn, signOut }

export default AuthService
