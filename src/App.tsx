import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Map from '@pages/Map/Map'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </>
  )
}

export default App
