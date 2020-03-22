import React, { useEffect, useState } from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import useFetchPassword from '../hooks/useFetchPassword'
import axios from 'axios'

export default function PasswordDetails ({ loginStatus }) {
  const { passwords, fetchPassword } = useFetchPassword()
  const history = useHistory()
  const { id } = useParams()
  const [verified, verifyUser] = useState(false)

  useEffect(() => {
    if(!loginStatus) history.push('/register')
  }, [history, loginStatus])

  if (!passwords) return <>loading</>

  const [passwordDetail] = passwords.filter(pass => {return pass.id === +id})
  const hide = (pass) => {
    let hiddenPass = ''
    pass.split('').forEach(_ => hiddenPass += '*')
    return hiddenPass
  }

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
  
  return (
    <>
      <div>
        <form>
          <div>
            <label>used web account</label>
            <input
              value={passwordDetail.account}
              contentEditable={false}
              readOnly
            />
          </div>
          <div>
            <label>registered email</label>
            <input
              value={passwordDetail.email}
              contentEditable={false}
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
              contentEditable={false}
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
        <button
          onClick={(e) => deletePassword(e, passwordDetail.id)}
        >delete password</button>
      </div>
    </>
  )
}