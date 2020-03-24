import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import passworderApi from '../config/api'

import Header from '../components/Header'
import UpdatePasswordModal from '../components/UpdatePasswordModal'
import FormInputOtp from '../components/FormInputOtp'

export default function PasswordDetails ({ loginStatus }) {
  const history = useHistory()
  const { id } = useParams()
  const [verified, setVerifyUser] = useState(false)
  const [password, setPassword] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openFormOtp, setOpenFormOtp] = useState(false)
  const [otpMesage, setOtpMessage] = useState('')
  const [accountPassword, setAccountPassword] = useState('*********')

  useEffect(() => {
    if(!loginStatus) history.push('/authentication')
    fetchPassword()
  }, [history, loginStatus])

  const fetchPassword = () => {
    const token = localStorage.getItem('access_token')
    passworderApi({
      method: 'GET',
      url: `/passwords/${id}`,
      headers: { token }
    })
      .then(({ data }) => {
        console.log(data)
        setPassword(data)
      })
      .catch((err) => console.log(err))
  }

  // const hide = (pass) => {
  //   console.log('masuk hide')
  //   if (pass) {
  //     console.log(pass)
  //     let hiddenPass = ''
  //     pass.split('').forEach(_ => hiddenPass += '*')
  //     return hiddenPass
  //   }
  // }

  const toggleModal = () => setOpenModal(!openModal)
  const toggleFormInputOtp = () => setOpenFormOtp(!openFormOtp)
  const passwordToShow = (pass) => setAccountPassword(pass)

  const requestShowPassword = (e, id) => {
    e.preventDefault()
    setVerifyUser(false)
    setOpenFormOtp(true)
    passworderApi({
      method: 'GET',
      url: `/otp/${id}`,
      headers: {
        token: localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        setOtpMessage(data.msg)
        setVerifyUser(true)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  const deletePassword = (e, id) => {
    e.preventDefault()
    const token  = localStorage.getItem('access_token')
    passworderApi({
      method: 'DELETE',
      url: `/passwords/${id}`,
      headers: { token }
    })
      .then(_ => {
        fetchPassword()
        history.push('/')
      })
      .catch((err) => console.log(err))
  }
  
  if (!password) return <>loading</>


  return (
    <>
      <Header />
      <div className="col-sm-12 col-lg-8 container">
        <div className="border-bottom p-3 detail-account-title-container">
          <h2 className="detail-account-title">
            {password.account}
          </h2>
          <div className="detail-account-action-container">
            <div 
              className="mx-2 rounded p-2 detail-account-action"
              onClick={toggleModal}
            >
              <i className="mx-1 fas fa-pen"></i>
              <p className="m-0 lg-show">
                Edit
              </p>
            </div>
            <div 
              className="mx-2 rounded p-2 detail-account-action"
              onClick={(e) => deletePassword(e, password.id)}
            >
              <i className="mx-1 fas fa-trash"></i>
              <p className="m-0 lg-show">
                Remove
              </p>
            </div>
          </div>
        </div>
        <div className="detail-account-content-container">
          <div className="my-5 pl-3 detail-account-item">
            <h5>Website address</h5>
            <h3>{password.account}</h3>
          </div>
          <div className="my-5 pl-3 detail-account-item">
            <h5>Registered email</h5>
            <h3>{password.email}</h3>
          </div>
          <div className="my-5 pl-3 detail-account-item">
            <h5>Registered password</h5>
            <div className="password-detail-area">
              <h3 className="m-0 p-0">
                {
                  verified
                    ? accountPassword
                    : '*********'
                }
              </h3>
              <i 
                onClick={(e) => requestShowPassword(e, password.id)}
                className="mx-3 fas fa-eye showPassword-toggle"
              ></i>
            </div>
          </div>
        </div>
        <UpdatePasswordModal
          passwordDetail={password}
          openModal={openModal}
          toggleModal={toggleModal}
          fetchPassword={fetchPassword}
        />
        <FormInputOtp 
          password={password}
          otpMesage={otpMesage}
          openFormOtp={openFormOtp}
          toggleFormInputOtp={toggleFormInputOtp}
          passwordToShow={passwordToShow}
        />
      </div>
    </>
  )
}
