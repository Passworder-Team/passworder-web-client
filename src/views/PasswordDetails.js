import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import passworderApi from '../config/api'

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
      <div>
        <form>
          <div>
            <label>used web account</label>
            <input
              value={password.account}
              readOnly
            />
          </div>
          <div>
            <label>registered email</label>
            <input
              value={password.email}
              readOnly
            />
          </div>
          <div>
            <label>registered password</label>
            <input
              value={
                verified 
                  ? accountPassword
                  : '*********'
                }
              readOnly
            />
            <button
              onClick={(e) => requestShowPassword(e, password.id)}
            >
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </form>
        <button><Link to="/">home</Link></button>
        <button onClick={toggleModal}>edit</button>
        <button
          onClick={(e) => deletePassword(e, password.id)}
        >delete password</button>
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
