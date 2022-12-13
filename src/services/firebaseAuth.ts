import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import axios from 'axios'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const provider = new GoogleAuthProvider()

export const googleSignIn = async () => {
  const res = await signInWithPopup(auth, provider)
  return res
  // const token: string = await res.user.getIdToken()
  // console.log(token)
  // const res2 = await axios.delete('/users', {
  //   headers: { Authorization: `${token}` },
  // })
  // console.log(res2)
}

export const googleSignOut = async () => {
  const res = await signOut(auth)
  console.log(res)
}
