import axios from 'axios'

// const BASE_URL = 'https://jlvadtrbkq.us16.qoddiapp.com/'

interface SignInParam {
  token: string
}

const signIn = async ({ token }: SignInParam) => {
  const res = await axios.get('/users/me', {
    headers: { Authorization: `${token}` },
  })

  return res
}

const signOut = async ({ token }: SignInParam) => {
  const res = await axios.delete('/users/me', {
    headers: { Authorization: `${token}` },
  })
  return res
}

const AuthService = { signIn, signOut }

export default AuthService
