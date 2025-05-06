import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authService  from './appwrite/auth'
import {Header, Footer} from './components'
import {Outlet} from 'react-router-dom'
import {login, logout} from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-primary-200 h-14 w-14"></div>
        <div className="flex-1 space-y-6 py-1 max-w-md">
          <div className="h-5 bg-primary-200 rounded w-3/4"></div>
          <div className="space-y-3">
            <div className="h-5 bg-primary-200 rounded"></div>
            <div className="h-5 bg-primary-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App