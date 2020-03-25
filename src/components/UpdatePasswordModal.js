import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import passworderApi from '../config/api'
import { useParams, useHistory } from 'react-router-dom'

export default function UpdatePasswordModal ({
  passwordDetail,
  openModal,
  toggleModal,
  fetchPassword,
  setIsAnySuccessMessage,
  setMessage,
  loading,
  setLoading
}) {
  const [account, setAccount] = useState(passwordDetail.account)
  const [email, setEmail] = useState(passwordDetail.email)
  const [password, setPassword] = useState('')
  const { id } = useParams()
  const history = useHistory()

  const updatePassword = e => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('access_token')
    passworderApi({
      method: 'PUT',
      url: `/passwords/${id}`,
      headers: { token },
      data: { account, email, password }
    })
      .then(({ data }) => {
        setMessage(data.msg)
        setIsAnySuccessMessage(true)
        fetchPassword()
        history.push('/')
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
    <Modal isOpen={openModal} className="col-sm-12">
      <ModalHeader>
        Update account details
      </ModalHeader>
      <ModalBody className="form-add-edit-password-container">
        <form
          className="form-add-edit-password" 
          onSubmit={e => updatePassword(e)}
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
            >update</button>
            <button
              className="btn mx-2 btn-cancel" 
              type="button" 
              onClick={toggleModal}
            >cancel</button>
            {loadingStatus()}
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}