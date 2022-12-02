import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Todo } from '@pages/Todo'
import Map from '@pages/Map'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  )
}

export default App
