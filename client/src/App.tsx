import { useAuth0 } from '@auth0/auth0-react'
import { Button } from 'antd'
import Dashboard from 'components/Dashboard'
import { useEffect } from 'react'
import { RiArrowRightLine, RiGithubFill } from 'react-icons/ri'
import { Si1Password } from 'react-icons/si'
import { useNavigate } from 'react-router-dom'

const Home = () => {
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
    return <Dashboard /> // Show the password manager if authenticated
  }

  return (
    <div className="flex h-screen flex-col items-center justify-between">
      <div
        id="nav"
        className="flex w-full max-w-screen-lg flex-row justify-between pt-6"
      >
        <a href="/" className="flex select-none flex-row items-center gap-x-1">
          <Si1Password />
          <span className="font-medium">UnPassword</span>
        </a>
        <div></div>
      </div>
      <main className="flex w-full max-w-screen-lg flex-col items-center">
        <div
          id="hero-section"
          className="grid w-full select-none grid-cols-2 items-end"
        >
          <div id="hero-left" className="pb-16 pr-4">
            <h1 className="text-8xl font-semibold">
              Safe place for all your passwords
            </h1>
            <div
              id="action-buttons"
              className="mt-12 flex flex-row items-center gap-x-8"
            >
              {isLoading ? (
                <Button size="large" color="primary" variant="solid">
                  Log into UnPassword
                </Button>
              ) : !isAuthenticated ? (
                <Button
                  size="large"
                  color="primary"
                  variant="solid"
                  onClick={() => {
                    handleLogin()
                  }}
                >
                  Log into UnPassword
                </Button>
              ) : (
                <a href="/dashboard">
                  <Button size="large" color="primary" variant="solid">
                    Open Dashboard
                  </Button>
                </a>
              )}

              <div className="max-h-min -translate-y-1 border-b border-slate-700 text-slate-700 hover:cursor-pointer hover:border-black hover:text-black">
                See what&apos;s new
              </div>
            </div>
            <div className="pt-24">
              <a
                href="https://github.com/PaisWillie/UnPassword"
                target="_blank"
                rel="noreferrer"
                className="flex max-w-min flex-row items-center gap-x-1 text-nowrap border-b-2 border-slate-100 transition-colors hover:border-slate-200"
              >
                <p>A cybersecure password manager system</p>
                <RiGithubFill />
              </a>
              <a
                href="https://macengsociety.ca/mec"
                target="_blank"
                className="group mt-1 flex max-w-min flex-row items-center gap-x-1 text-nowrap text-slate-600 hover:text-slate-700"
                rel="noreferrer"
              >
                MEC 2024, Programming
                <RiArrowRightLine className="transition-all group-hover:translate-x-1" />
              </a>
            </div>
          </div>
          <img src="hero-section-graphic.png" className="pointer-events-none" />
        </div>
      </main>
    </div>
  )
}

export default Home
