import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

export default function UpdatePasswordModal ({
  passwordDetail,
  openModal,
  toggleModal,
  fetchPassword
}) {
  const [account, setAccount] = useState(passwordDetail.account)
  const [email, setEmail] = useState(passwordDetail.email)
  const [password, setPassword] = useState(passwordDetail.password)
  const { id } = useParams()
  const history = useHistory()

  const updatePassword = e => {
    e.preventDefault()
    const token = localStorage.getItem('access_token')
    axios({
      method: 'PUT',
      url: `http://localhost:3000/passwords/${id}`,
      headers: { token },
      data: { account, email, password }
    })
      .then(({ data }) => {
        console.log(data.msg)
        fetchPassword()
        history.push('/')
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
        Update account details
      </ModalHeader>
      <ModalBody>
        <form onSubmit={e => updatePassword(e)}>
          <label>Account Name</label>
          <input
            value={account}
            onChange={e => setAccount(e.target.value)}
            type="url"
            required
          />
          <br />
          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
          <br />
          <label>Account Password</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            minLength="6"
            required
          />
          <button type="submit">update</button>
          <button type="button" onClick={toggleModal}>cancel</button>
        </form>
      </ModalBody>
    </Modal>
  )
}