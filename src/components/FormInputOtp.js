import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useParams } from 'react-router-dom'
import passworderApi from '../config/api'
import jwt from 'jsonwebtoken'

export default function UpdatePasswordModal({
  openFormOtp,
  setOpenFormOtp,
  toggleFormInputOtp,
  otpMesage,
  passwordToShow,
  password,
  requestShowPassword,
  setOtpResponseMessage,
  setOtpError,
  setHidePassword
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
        setOtpResponseMessage('')
        setOpenFormOtp(false)
        setHidePassword(false)
        setOtpError(false)
      })
      .catch(err => {
        setOtpResponseMessage(err.response.data.msg)
        setOtpError(true)
        setOpenFormOtp(false)
      })
      .finally(() => {
        setOtpCode('')
      })
  }

  return (
    <Modal className="modal-otp" isOpen={openFormOtp}>
      <ModalHeader>
        Input OTP Code
      </ModalHeader>
      <ModalBody className="modal-otp-body">
        <form onSubmit={(e) => sendOtp(e)}>
          <div className="form-group">
            <label>{otpMesage}</label>
            <div className="input-otp-area">
              <input
                value={otpCode}
                onChange={e => setOtpCode(e.target.value)}
                type="text"
                required
              />
              <div
                className="ml-3 btn btn-resend-otp"
                onClick={e => requestShowPassword(e, id)}
              >Resend OTP Code</div>
            </div>
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