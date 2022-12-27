import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Edit from '@pages/Edit/Edit'
import Main from '@pages/Main/Main'
import Navigation from '@pages/Navigation/Navigation'
import Store from '@pages/Store/Store'
import Write from '@pages/Write/Write'
import { auth } from '@services/firebaseAuth'
import { getUserThunk } from '@stores/auth/authSlice'
import { useAppDispatch } from '@stores/store'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token: string = await user.getIdToken()
        dispatch(getUserThunk(token))
      }
    })
    return unsubscribe
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Main />} />
        <Route path="/stores/:storeId" element={<Store />} />
        <Route path="/stores/:storeId/write" element={<Write />} />
        <Route path="/stores/:storeId/edit/:reviewId" element={<Edit />} />
      </Route>
    </Routes>
  )
}

export default App
