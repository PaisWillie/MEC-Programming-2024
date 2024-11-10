import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  }
])

root.render(<RouterProvider router={router} />)
