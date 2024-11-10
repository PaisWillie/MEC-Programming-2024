import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordManagerHome from './components/PasswordManagerHome/PasswordManagerHome'

const App = () => {
  const { isAuthenticated, isLoading, error, loginWithRedirect } = useAuth0()
  const navigate = useNavigate()

  // Check authentication status and redirect if necessary
  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the PasswordManagerHome after login
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async () => {
    await loginWithRedirect()
  }

  if (isLoading) {
    return <div>Loading...</div> // Show loading screen while checking authentication
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }
  if (isAuthenticated) {
    return <PasswordManagerHome /> // Show the password manager if authenticated
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md text-center transform transition duration-300 hover:scale-105">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">UnPassword</h1>
        <p className="text-gray-700 text-lg mb-8">
          The modern, secure way to log in—no passwords required. Effortless and
          secure access for everyone.
        </p>
        {!isAuthenticated && (
          <button
            onClick={handleLogin}
            className="px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  )
}

export default App
