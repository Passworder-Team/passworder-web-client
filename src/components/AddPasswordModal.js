import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import passworderApi from '../config/api'

export default function AddPasswordModal ({
  openModal,
  setOpenModal,
  fetchPassword
}) {
  const [account, setAccount] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createPassword = e => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    passworderApi({
      method: 'POST',
      url: 'http://localhost:3000/passwords',
      headers: { token },
      data: { account, email, password }
    })
      .then(({ data }) => {
        console.log(data.msg)
        fetchPassword()
        setOpenModal(false)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setAccount('')
        setEmail('')
        setPassword('')
      })
  }

  return (
    <Modal isOpen={openModal}>
      <ModalHeader>
        Add Account Password
      </ModalHeader>
      <ModalBody className="form-add-edit-password-container">
        <form
          className="form-add-edit-password" 
          onSubmit={e => createPassword(e)}
        >
          <div className="form-group form-input">
            <label>Website address</label>
            <input
              className="form-control"
              value={account}
              onChange={e => setAccount(e.target.value)}
              type="url"
              required
            />
          </div>
          <div className="form-group form-input">
            <label>Email</label>
            <input
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
          </div>
          <div className="form-group form-input">
            <label>Account Password</label>
            <input
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              minLength="6"
              required
            />
          </div>
          <div>
            <button
              className="btn btn-submit" 
              type="submit"
            >create</button>
            <button
              className="btn mx-2 btn-cancel" 
              type="button" 
              onClick={() => setOpenModal(false)}
            >cancel</button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}