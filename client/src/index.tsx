import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import Dashboard from 'components/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'

import { Auth0Provider } from '@auth0/auth0-react'
import Home from 'Home'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/home',
    element: <Home />
  }
])

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
)
