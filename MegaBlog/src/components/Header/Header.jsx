import React, { useState } from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='sticky top-0 z-50 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <div className='flex-shrink-0 flex items-center'>
              <Link to='/'>
                <Logo width='70px' />
              </Link>
            </div>
          </div>
          
          <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4'>
            {navItems.map((item) => 
              item.active ? (
                <button
                  key={item.name}
                  onClick={() => navigate(item.slug)}
                  className='px-4 py-2 rounded-md text-sm font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700 transition-colors duration-200'
                >
                  {item.name}
                </button>
              ) : null
            )}
            {authStatus && (
              <LogoutBtn />
            )}
          </div>
          
          <div className='flex items-center sm:hidden'>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-secondary-700 hover:text-secondary-900 hover:bg-secondary-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
            >
              <span className='sr-only'>Open main menu</span>
              {mobileMenuOpen ? (
                <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                </svg>
              ) : (
                <svg className='block h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className='sm:hidden bg-white px-4 pt-2 pb-3 space-y-1'>
          {navItems.map((item) => 
            item.active ? (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.slug)
                  setMobileMenuOpen(false)
                }}
                className='block px-3 py-2 rounded-md text-base font-medium text-secondary-700 hover:bg-primary-50 hover:text-primary-700 w-full text-left'
              >
                {item.name}
              </button>
            ) : null
          )}
          {authStatus && (
            <div className='pt-2'>
              <LogoutBtn />
            </div>
          )}
        </div>
      )}
    </header>
  )
}

export default Header