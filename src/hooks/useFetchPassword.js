import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetchPassword () {
  const [passwords, setPasswords] = useState([])
  const [detail, setDetail] = useState({})
  
  useEffect(() => {
    if(!passwords) {
      const token = localStorage.getItem('access_token')
      axios({
        method: 'GET',
        url: 'http://localhost:3000/passwords',
        headers: { token }
      })
        .then(({ data }) => {
          setPasswords(data)
        })
        .catch((err) => console.log(err))
    }
  }, [passwords])

  const fetchPassword = () => {
    const token = localStorage.getItem('access_token')
    axios({
      method: 'GET',
      url: 'http://localhost:3000/passwords',
      headers: { token }
    })
      .then(({ data }) => {
        setPasswords(data)
      })
      .catch((err) => console.log(err))
  }

  return {
    passwords,
    fetchPassword,
    detail,
    setDetail
  }
}