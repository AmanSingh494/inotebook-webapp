import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Login = (props) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      })
      const json = await response.json()
      console.log(json)
      if (json.success) {
        //  saving the auth-token and redirecting

        localStorage.setItem('token', json.authToken)
        navigate('/')
        props.showAlert('Login successful', 'success')
      } else {
        props.showAlert('Incorrect credentials', 'danger')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='container'>
      <h1>Log in</h1>
      <form className='my-4' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            onChange={onChange}
            name='email'
            value={credentials.email}
          />
          <div id='emailHelp' className='form-text'>
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            onChange={onChange}
            value={credentials.password}
            name='password'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login
