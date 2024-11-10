import { createRoot } from 'react-dom/client';
import 'tailwindcss/tailwind.css';

import App from './App';
import PasswordManagerHome from './components/PasswordManagerHome/PasswordManagerHome';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/password-manager',
    element: <PasswordManagerHome />,
  },
]);

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <RouterProvider router={router} />
  </Auth0Provider>
);
