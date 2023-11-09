import './styles/main.css'
import '@mantine/core/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { resolver, theme, toastTheme } from './theme'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ColorSchemeScript forceColorScheme="dark" />
        <MantineProvider forceColorScheme="dark" theme={theme} cssVariablesResolver={resolver}>
          <Toaster toastOptions={toastTheme} position="top-right" />
          <App />
        </MantineProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
