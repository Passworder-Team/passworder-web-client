import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import passworderApi from '../config/api'

// components
import Header from '../components/Header'
import AddPasswordModal from '../components/AddPasswordModal'
import PasswordList from '../components/PasswordList'

export default function HomePage ({ loginStatus, setLoginStatus }) {
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const [passwords, setPasswords] = useState([])

  useEffect(() => {
    if(!loginStatus) history.push('/authentication')
    fetchPassword()
  }, [loginStatus, history])

  const fetchPassword = () => {
    const token = localStorage.getItem('access_token')
    passworderApi({
      method: 'GET',
      url: '/passwords',
      headers: { token }
    })
      .then(({ data }) => {
        setPasswords(data)
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      <button onClick={() => setOpenModal(true)}>add new password</button>
      <PasswordList passwords={passwords} />
      <AddPasswordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchPassword={fetchPassword}
      />
    </>
  )
}