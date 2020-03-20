import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function HomePage ({ token, setToken }) {
  const history = useHistory()

  useEffect(() => {
    if(!token) history.push('/register')
    console.log(token)
  }, [token, history])

  const logout = () => {
    setToken('')
    localStorage.clear()
  }

  return (
    <>
      HomePage
      <button onClick={logout}>logout</button>
    </>
  )
}