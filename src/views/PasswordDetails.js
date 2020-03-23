import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from 'axios'

import UpdatePasswordModal from '../components/UpdatePasswordModal'

export default function PasswordDetails ({ loginStatus }) {
  const history = useHistory()
  const { id } = useParams()
  const [verified, verifyUser] = useState(false)
  const [passwords, setPasswords] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [passwordDetail] = passwords ? passwords.filter(pass => {return pass.id === +id}) : ''

  useEffect(() => {
    if(!loginStatus) history.push('/authentication')
    fetchPassword()
  }, [history, loginStatus])

  const fetchPassword = () => {
    const token = localStorage.getItem('access_token')
    axios({
      method: 'GET',
      url: 'http://localhost:3000/passwords',
      headers: { token }
    })
      .then(({ data }) => {
        setPasswords(data)
      })
      .catch((err) => console.log(err))
  }

  const hide = (pass) => {
    let hiddenPass = ''
    pass.split('').forEach(_ => hiddenPass += '*')
    return hiddenPass
  }

  const toggleModal = () => setOpenModal(!openModal)

  const showPassword = (e) => {
    e.preventDefault()
    verifyUser(true)
  }

  const deletePassword = (e, id) => {
    e.preventDefault()
    const token  = localStorage.getItem('access_token')
    axios({
      method: 'DELETE',
      url: `http://localhost:3000/passwords/${id}`,
      headers: { token }
    })
      .then(_ => {
        fetchPassword()
        history.push('/')
      })
      .catch((err) => console.log(err))
  }
  
  if (!passwordDetail) return <>loading</>

  return (
    <>
      <div>
        <form>
          <div>
            <label>used web account</label>
            <input
              value={passwordDetail.account}
              readOnly
            />
          </div>
          <div>
            <label>registered email</label>
            <input
              value={passwordDetail.email}
              readOnly
            />
          </div>
          <div>
            <label>registered password</label>
            <input
              value={
                verified 
                  ? passwordDetail.password 
                  : hide(passwordDetail.password)
                }
              readOnly
            />
            <button
              onClick={(e) => showPassword(e)}
            >
              <i className="fas fa-eye"></i>
            </button>
          </div>
        </form>
        <button><Link to="/">home</Link></button>
        <button onClick={toggleModal}>edit</button>
        <button
          onClick={(e) => deletePassword(e, passwordDetail.id)}
        >delete password</button>
        <UpdatePasswordModal
          passwordDetail={passwordDetail}
          openModal={openModal}
          toggleModal={toggleModal}
          fetchPassword={fetchPassword}
        />
      </div>
    </>
  )
}