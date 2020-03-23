import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

// components
import Header from '../components/Header'
import AddPasswordModal from '../components/AddPasswordModal'
import PasswordList from '../components/PasswordList'
import useFetchPassword from '../hooks/useFetchPassword'

export default function HomePage ({ loginStatus, setLoginStatus }) {
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const {
    passwords,
    fetchPassword
  } = useFetchPassword()

  useEffect(() => {
    if(!loginStatus) history.push('/authentication')
  }, [loginStatus, history])

  const logout = () => {
    setLoginStatus(false)
    localStorage.clear()
  }

  return (
    <>
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      HomePage
      <button onClick={() => setOpenModal(true)}>add new password</button>
      <PasswordList passwords={passwords} />
      <AddPasswordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        fetchPassword={fetchPassword}
      />
      <button onClick={logout}>logout</button>
    </>
  )
}