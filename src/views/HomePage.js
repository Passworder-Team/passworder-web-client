import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

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
    if(!loginStatus) history.push('/register')
  }, [loginStatus, history])

  const logout = () => {
    setLoginStatus(false)
    localStorage.clear()
  }

  if (!passwords) return <>loading...</>
  return (
    <>
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