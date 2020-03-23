import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useParams, useHistory } from 'react-router-dom'
import passworderApi from '../config/api'

export default function UpdatePasswordModal({
  openFormOtp,
  toggleFormInputOtp,
  otpMesage,
  passwordToShow,
  password
}) {
  const [otpCode, setOtpCode] = useState('')
  const { id } = useParams()
  const history = useHistory()

  const sendOtp = (e) => {
    e.preventDefault()
    console.log(otpCode, id)
    const payload = {
      otp: otpCode,
      passId: id
    }
    passworderApi({
      method: 'POST',
      url: `/otp`,
      data: payload,
      headers: {
        token: localStorage.getItem('access_token')
      }
    })
      .then(({ data }) => {
        console.log(data)
        passwordToShow(password.password)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Modal isOpen={openFormOtp}>
      <ModalHeader>
        Update account details
      </ModalHeader>
      <ModalBody>
        <form onSubmit={e => sendOtp(e)}>
        {/* <form> */}
          <label>{otpMesage}</label>
          <input
            value={otpCode}
            onChange={e => setOtpCode(e.target.value)}
            type="text"
            required
          /><br />
          <button type="submit">Submit</button>
          <button type="button" onClick={toggleFormInputOtp}>cancel</button>
        </form>
      </ModalBody>
    </Modal>
  )
}