import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

export default function RegisterPage ({ token }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if(token) history.push('/')
  }, [token, history])

  const register = (e) => {
    e.preventDefault()
    let payload= { name, email, password }
    axios
      .post('http://localhost:3000/auth/register', payload)
      .then(() => history.push('/login'))
      .catch((err) => {
        // console.log(err)
        setName('')
        setEmail('')
        setPassword('')
      })
  }

  return (
    <>
      <form onSubmit={(e) => register(e)}>
        <label>name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          minLength="3"
          required
        />
        <label>email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>password</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">register</button>
        already a user? <Link to="/login">login</Link> instead!
      </form>
    </>
  )
}