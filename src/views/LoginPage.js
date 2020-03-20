import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage ({ token, setToken }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if(token) history.push('/')
  }, [token, history])

  const login = (e) => {
    e.preventDefault()
    let payload = { name, email, password }
    axios
      .post('http://localhost:3000/auth/login', payload)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        setToken(data.token)
        history.push('/')
      })
      .catch((err) => {
        // console.log(err)
        setName('')
        setEmail('')
        setPassword('')
      })
  }

  return (
    <>
      <form onSubmit={(e) => login(e)}>
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
        <button type="submit">login</button>
        not a user yet? <Link to="/register">register</Link> here!
      </form>
    </>
  )
}