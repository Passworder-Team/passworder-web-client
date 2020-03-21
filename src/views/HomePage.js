import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function HomePage ({ loginStatus, setLoginStatus }) {
  const history = useHistory()

  useEffect(() => {
    if(!loginStatus) history.push('/register')
    fetchPassword()
  }, [loginStatus, history])

  const logout = () => {
    setLoginStatus(false)
    localStorage.clear()
  }

  const fetchPassword = () => {
    const token = localStorage.getItem('access_token')
    axios({
      method: 'GET',
      url: 'http://localhost:3000/passwords',
      headers: {token}
    })
      .then((data) => {
        console.log(data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      HomePage
      <button onClick={logout}>logout</button>
    </>
  )
}