import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from '@pages/main/Main'
import Review from '@pages/review/Review'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </div>
  )
}

export default App
