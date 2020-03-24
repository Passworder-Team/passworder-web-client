import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import passworderApi from '../config/api'

// components
import Header from '../components/Header'
import AddPasswordModal from '../components/AddPasswordModal'
import PasswordList from '../components/PasswordList'
import PasswordDetail from './PasswordDetails'

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
    <div className="homePage-container">
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      <div className="password-list-container">
        <div className="col-sm-12 col-lg-6 password-list">
          <button
            className="my-3 btn btn-add-password" 
            onClick={() => setOpenModal(true)}
          >add new password</button>
          <PasswordList passwords={passwords} />
          <AddPasswordModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            fetchPassword={fetchPassword}
          />
        </div>
      </div>
      {/* <PasswordDetail /> */}
    </div>
  )
}