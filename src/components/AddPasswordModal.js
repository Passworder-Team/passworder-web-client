import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import axios from 'axios'

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
    axios({
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
        Create new Password
      </ModalHeader>
      <ModalBody>
        <form onSubmit={e => createPassword(e)}>
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
            type="text"
            minLength="6"
            required
          />
          <button type="submit">create</button>
          <button type="button" onClick={() => setOpenModal(false)}>cancel</button>
        </form>
      </ModalBody>
    </Modal>
  )
}