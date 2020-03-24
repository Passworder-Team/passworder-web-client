import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useParams } from 'react-router-dom'
import passworderApi from '../config/api'
import jwt from 'jsonwebtoken'

export default function UpdatePasswordModal({
  openFormOtp,
  toggleFormInputOtp,
  otpMesage,
  passwordToShow,
  password
}) {
  const [otpCode, setOtpCode] = useState('')
  const { id } = useParams()

  const sendOtp = (e) => {
    e.preventDefault()
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
        const decoded = jwt.verify(password.password, data.secret)
        passwordToShow(decoded)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Modal isOpen={openFormOtp}>
      <ModalHeader>
        Input OTP Code
      </ModalHeader>
      <ModalBody>
        <form onSubmit={e => sendOtp(e)}>
          <div className="form-group">
            <label>{otpMesage}</label>
            <input
              value={otpCode}
              onChange={e => setOtpCode(e.target.value)}
              type="text"
              required
            /><br />
          </div>
          <div>
            <button
              className="btn btn-submit"
              type="submit"
            >Submit</button>
            <button
              className="btn mx-2 btn-cancel"
              type="button"
              onClick={toggleFormInputOtp}
            >cancel</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}