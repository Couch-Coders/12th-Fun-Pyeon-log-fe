import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Map from '@pages/Map/Map'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} />
      </Routes>
    </div>
  )
}

export default App
