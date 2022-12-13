import React, { useEffect } from 'react'
import Main from '@pages/Main'
import Navigation from '@pages/Navigation/Navigation'
import { Route, Routes } from 'react-router-dom'
import { auth } from '@services/firebaseAuth'
import { onAuthStateChanged } from 'firebase/auth'
import { getUserThunk } from '@stores/auth/authThunk'
import { useAppDispatch } from '@stores/store'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token: string = await user.getIdToken()
        dispatch(getUserThunk(token))
        console.log(user)
      }
    })
    return unsubscribe
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  )
}

export default App
