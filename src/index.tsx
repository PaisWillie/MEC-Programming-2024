import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import HelloWorld from 'components/helloWorld'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/hello',
    element: <HelloWorld />
  }
])

root.render(<RouterProvider router={router} />)
