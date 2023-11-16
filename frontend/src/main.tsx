import './styles/main.css'
import '@mantine/core/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

import App from './App'
import { resolver, theme, toastTheme } from './theme'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        <ColorSchemeScript forceColorScheme="dark" />
        <MantineProvider forceColorScheme="dark" theme={theme} cssVariablesResolver={resolver}>
          <Toaster toastOptions={toastTheme} position="top-right" />
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
