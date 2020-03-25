import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import passworderApi from '../config/api'

export default function AddPasswordModal ({
  openModal,
  setOpenModal,
  fetchPassword,
  setIsAnySuccessMessage,
  setLoading,
  loading,
  setMessage
}) {
  const [account, setAccount] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const createPassword = e => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('access_token')
    passworderApi({
      method: 'POST',
      url: '/passwords',
      headers: { token },
      data: { account, email, password }
    })
      .then(({ data }) => {
        setMessage(data.msg)
        setIsAnySuccessMessage(true)
        setTimeout(() => {
          setIsAnySuccessMessage(false)
        }, 3000);
        fetchPassword()
        setOpenModal(false)
      })
      .catch(err => setLoading(true))
      .finally(() => {
        setLoading(false)
        setAccount('')
        setEmail('')
        setPassword('')
      })
  }

  const loadingStatus = () => {
    if (loading) {
      return <div>Loading...</div>
    } else {
      return <></>
    }
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
          <div className="form-action-area">
            <button
              className="btn btn-submit" 
              type="submit"
            >create</button>
            <button
              className="btn mx-2 btn-cancel" 
              type="button" 
              onClick={() => setOpenModal(false)}
            >cancel</button>
            {loadingStatus()}
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}