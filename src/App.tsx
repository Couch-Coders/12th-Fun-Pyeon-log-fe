import React from "react";
import { Route, Routes } from "react-router-dom";

import { Todo } from "@pages/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
