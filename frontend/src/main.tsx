import './styles/main.css'
import '@mantine/core/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'

import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { resolver, theme } from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <MantineProvider defaultColorScheme="dark" theme={theme} cssVariablesResolver={resolver}>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
