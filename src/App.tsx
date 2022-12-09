import React from 'react'
import Map from '@pages/Map'
import Navigation from '@pages/Navigation/Navigation'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Map />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
