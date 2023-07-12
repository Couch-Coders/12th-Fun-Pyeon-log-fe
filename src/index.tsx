import React from 'react'
import { Provider } from 'react-redux'
import MapProvider from '@context/MapContext'
import { store, persistor } from '@stores/store'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'theme'
import App from './App'
import { GlobalStyle } from './global.styles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MapProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
          </ThemeProvider>
        </MapProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
