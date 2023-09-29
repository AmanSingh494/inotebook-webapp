import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  })
  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if (credentials.password === credentials.cPassword) {
        const response = await fetch(
          'http://localhost:5000/api/auth/createuser',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: credentials.name,
              email: credentials.email,
              password: credentials.password
            })
          }
        )
        const json = await response.json()
        console.log(json)
        if (json.success) {
          //  saving the auth-token and redirecting
          localStorage.setItem('token', json.authToken)
          navigate('/')
          props.showAlert('Signed up successfully', 'success')
        } else {
          props.showAlert(json.errors[0].msg, 'danger')
        }
      } else {
        props.showAlert('password doesnot match', 'danger')
      }
    } catch (err) {
      console.log(err)
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            // id='exampleInputEmail1'
            aria-describedby='emailHelp'
            onChange={onChange}
            name='name'
            value={credentials.name}
          />
        </div>
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
            id='password'
            onChange={onChange}
            value={credentials.password}
            name='password'
            minLength={8}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Confirm Password
          </label>
          <input
            type='password'
            className='form-control'
            id='cpassword'
            onChange={onChange}
            value={credentials.cPassword}
            name='cPassword'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
