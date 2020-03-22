import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage ({ loginStatus, setLoginStatus }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if(loginStatus) history.push('/')
  }, [loginStatus, history])

  const login = (e) => {
    e.preventDefault()
    let payload = { name, email, password }
    axios
      .post('http://localhost:3000/auth/login', payload)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        setLoginStatus(true)
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="3"
          required
        />
        <label>email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">login</button>
        not a user yet? <Link to="/register">register</Link> here!
      </form>
    </>
  )
}