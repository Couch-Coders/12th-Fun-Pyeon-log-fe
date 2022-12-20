import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './global.styles'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from '@stores/store'
import { ThemeProvider } from 'styled-components'
import { theme } from 'theme'
import MapProvider from '@context/MapContext'
import { PersistGate } from 'redux-persist/integration/react'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MapProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <App />
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </MapProvider>
    </BrowserRouter>
  </React.StrictMode>
)
