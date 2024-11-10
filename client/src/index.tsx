import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import Dashboard from 'components/Dashboard'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Auth0Provider } from '@auth0/auth0-react'
import App from 'App'

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
  }
])

const providerConfig = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  // onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(import.meta.env.VITE_AUTH0_AUDIENCE ? { audience: import.meta.env.VITE_AUTH0_AUDIENCE } : null),
    scope: "openid profile email",
  },
};

root.render(
  <Auth0Provider
    {...providerConfig}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
)
