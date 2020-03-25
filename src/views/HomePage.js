import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Alert } from 'reactstrap'
import passworderApi from '../config/api'

// components
import Header from '../components/Header'
import AddPasswordModal from '../components/AddPasswordModal'
import PasswordList from '../components/PasswordList'
import Loading from '../components/Loading'

export default function HomePage ({ 
  loginStatus, 
  setLoginStatus,
  message,
  isAnySuccessMessage,
  setIsAnySuccessMessage,
  setLoading,
  loading
}) {
  const history = useHistory()
  const [openModal, setOpenModal] = useState(false)
  const [passwords, setPasswords] = useState([])

  useEffect(() => {
    if(!loginStatus) history.push('/authentication')
    fetchPassword()
    setTimeout(() => {
      setIsAnySuccessMessage(false)
    }, 3000);
  }, [loginStatus, history, isAnySuccessMessage])

  const fetchPassword = () => {
    const token = localStorage.getItem('access_token')
    setLoading(true)
    passworderApi({
      method: 'GET',
      url: '/passwords',
      headers: { token }
    })
      .then(({ data }) => {
        setPasswords(data)
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="homePage-container">
      <Header loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
      {
        loading
          ? <Loading />
          : <div className="password-list-container">
              <div className="col-sm-12 col-lg-6 password-list">
                <div className="list-header">
                  <button
                    className="my-3 btn btn-add-password"
                    onClick={() => setOpenModal(true)}
                  >add new password</button>
                  <Alert
                    className="m-0"
                    color="success"
                    isOpen={isAnySuccessMessage}
                  >
                    {message}
                  </Alert>
                </div>
                <PasswordList
                  passwords={passwords}
                />
                <AddPasswordModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  fetchPassword={fetchPassword}
                />
                </div>
              </div>
      }
    </div>
  )
}