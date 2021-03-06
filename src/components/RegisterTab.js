import React, { useState } from 'react'
import { TabPane, Row, Col } from 'reactstrap'
import passworderApi from '../config/api'
import { useHistory } from 'react-router-dom'

export default function RegisterTab ({ 
  tabId, 
  setLoginStatus,
  setLoading,
  setIsAnySuccessMessage,
  setMessage
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const register = (e) => {
    e.preventDefault()
    setLoading(true)
    let newPhone = phone.split('').map((num, i) => i === 0 ? num = '+62' : num).join('')
    let payload = { 
      name, 
      email, 
      phoneNumber: newPhone, 
      password
    }
    passworderApi({
      method: 'POST',
      url: '/auth/register',
      data: payload
    })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        localStorage.setItem('current_user', data.user.name)
        setLoginStatus(true)
        setIsAnySuccessMessage(true)
        setMessage('Hi, ' + data.user.name)
        history.push('/')
      })
      .catch((err) => {
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
      })
      .finally(_ => {
        setLoading(false)
      })
  }

  return (
    <TabPane tabId={tabId}>
      <Row>
        <Col sm="12">
          <form
            className="form-sign"
            onSubmit={(e) => register(e)}
          >
            <div
              className="
                p-3
                form-all-input-container"
            >
              <div className="form-group form-input-group">
                <label>Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  minLength="3"
                  required
                />
              </div>
              <div className="form-group form-input-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group form-input-group">
                <label>Phone Number</label>
                <input
                  className="form-control"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength="13"
                  required
                />
              </div>
              <div className="form-group form-input-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-action-container">
                <button className="btn btn-dark mr-3" type="submit">Sign up</button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </TabPane>
  )
}