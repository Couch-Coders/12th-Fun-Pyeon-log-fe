import React from 'react'
import Map from '@pages/Map'
import Navigation from '@pages/Navigation/Navigation'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Map />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
