import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// components
import Header from '../components/Header'

export default function HomePage ({ token, setToken }) {
  const history = useHistory()

  useEffect(() => {
    if(!token) history.push('/register')
    console.log(token)
  }, [token, history])

  return (
    <>
      <Header token={token} setToken={setToken}/>
      HomePage
    </>
  )
}