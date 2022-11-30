import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Todo } from '@pages/Todo';
import Map from '@pages/Map';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/todo' element={<Todo />} />
				<Route path='/map' element={<Map />} />
			</Routes>
		</div>
	);
}

export default App;
