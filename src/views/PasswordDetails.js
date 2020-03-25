import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Alert } from 'reactstrap'
import passworderApi from '../config/api'

import Header from '../components/Header'
import UpdatePasswordModal from '../components/UpdatePasswordModal'
import FormInputOtp from '../components/FormInputOtp'
import Loading from '../components/Loading'

export default function PasswordDetails ({ 
  loginStatus,
  setIsAnySuccessMessage,
  setMessage,
  setLoading,
  loading,
  setLoginStatus
}) {
  const history = useHistory()
  const { id } = useParams()
  const [verified, setVerifyUser] = useState(false)
  const [password, setPassword] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openFormOtp, setOpenFormOtp] = useState(false)
  const [otpMesage, setOtpMessage] = useState('')
  const [otpResponseMessage, setOtpResponseMessage] = useState('')
  const [otpError, setOtpError] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)
  const [accountPassword, setAccountPassword] = useState('*********')

  useEffect(() => {
    if(!loginStatus) history.push('/authentication')
    fetchPassword()
  }, [history, loginStatus])

  const fetchPassword = () => {
    setLoading(true)
    const token = localStorage.getItem('access_token')
    passworderApi({
      method: 'GET',
      url: `/passwords/${id}`,
      headers: { token }
    })
      .then(({ data }) => {
        setPassword(data)
      })
      .catch((err) => setLoading(true))
      .finally(_ => {
        setLoading(false)
      })
  }

  const toggleModal = () => setOpenModal(!openModal)
  const toggleFormInputOtp = () => setOpenFormOtp(!openFormOtp)
  const passwordToShow = (pass) => setAccountPassword(pass)
  const toggleHidePassword = (value) => setHidePassword(value)

  const requestShowPassword = (e, id) => {
    if (accountPassword === '*********'){
      e.preventDefault()
      setOtpMessage('We have sent OTP code to your phone number, please wait...')
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
          setVerifyUser(false)
        })
    } else {
      toggleHidePassword(false)
    }
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
      .catch((err) => setLoading(true))
  }

  return (
    <>
      <Header setLoginStatus={setLoginStatus} />
      {
        loading
          ? <Loading />
          : <div className="col-sm-12 col-lg-8 container">
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
                  <div className="show-password-area">
                    <h5 className="m-0">Registered password</h5>
                    {
                      !hidePassword
                        ? <i
                          className="mx-3 fas fa-eye-slash showPassword-toggle"
                          onClick={() => toggleHidePassword(true)}
                        ></i>
                        : <i
                          onClick={(e) => requestShowPassword(e, password.id)}
                          className="mx-3 fas fa-eye showPassword-toggle"
                        ></i>
                    }
                  </div>
                  <div className="password-detail-area">
                    <h3 className="m-0 p-0">
                      {
                        verified && !hidePassword
                          ? accountPassword
                          : '*********'
                      }
                    </h3>
                    <Alert
                      className="alert-error"
                      color="danger"
                      isOpen={otpError}
                    >
                      {otpResponseMessage}
                    </Alert>
                  </div>
                </div>
              </div>
              <UpdatePasswordModal
                passwordDetail={password}
                openModal={openModal}
                toggleModal={toggleModal}
                fetchPassword={fetchPassword}
                setIsAnySuccessMessage={setIsAnySuccessMessage}
                setMessage={setMessage}
                verified={verified}
                passwordToShow={passwordToShow}
                loading={loading}
                setLoading={setLoading}
              />
              <FormInputOtp
                password={password}
                otpMesage={otpMesage}
                openFormOtp={openFormOtp}
                setOpenFormOtp={setOpenFormOtp}
                toggleFormInputOtp={toggleFormInputOtp}
                passwordToShow={passwordToShow}
                requestShowPassword={requestShowPassword}
                setOtpResponseMessage={setOtpResponseMessage}
                setOtpError={setOtpError}
                setHidePassword={setHidePassword}
              />
            </div>
      }
    </>
  )
}
