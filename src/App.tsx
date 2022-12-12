import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Map from '@pages/Map'
import Navigation from '@pages/Navigation/Navigation'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route path="/" element={<Map />} />
      </Route>
    </Routes>
  )
}

export default App
