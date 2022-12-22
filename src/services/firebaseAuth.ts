import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDOU_WGKwEGI1Ao9w1DDz6fzEngYNCpI0g",
  authDomain: "funpyeonlog-be.firebaseapp.com",
  projectId: "funpyeonlog-be",
  storageBucket: "funpyeonlog-be.appspot.com",
  messagingSenderId: "1091175651376",
  appId: "1:1091175651376:web:64eef9b8cec19dff5e35f5",
  measurementId: "G-Q49C8T2XDN"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account',
})
export const googleSignIn = async () => await signInWithPopup(auth, provider)

export const googleSignOut = async () => await signOut(auth)
