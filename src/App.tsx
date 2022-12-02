import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Todo } from '@pages/Todo'
import Map from '@pages/Map'
import Navigation from '@pages/Navigation'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/" element={<Map />} />
          <Route path="/todo" element={<Todo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
