import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const Navbar = (props) => {
  // use location hook helps to know on which route we currently are, location.pathname gives the name of the route
  const location = useLocation()
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location])
  const handleLogOut = () => {
    localStorage.removeItem('token')
    props.showAlert('Logged out successfully', 'success')
  }
  return (
    <>
      <nav className='navbar-dark navbar navbar-expand-lg bg-dark' id='navbar'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            iNotebook
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    location.pathname === '/' ? 'active' : ''
                  }`}
                  aria-current='page'
                  to='/'
                >
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link
                  className={`nav-link ${
                    location.pathname === '/about' ? 'active' : ''
                  }`}
                  to='/about'
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? (
              <div>
                <Link className='btn btn-light mx-2' to='/login' role='button'>
                  Log in
                </Link>
                <Link
                  className='btn btn-light mx-2'
                  to='/createuser'
                  role='button'
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <Link
                className='btn btn-light mx-2'
                onClick={handleLogOut}
                to='/login'
                role='button'
              >
                Log out
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
