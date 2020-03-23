import React, { useState } from 'react'
import { TabPane, Row, Col } from 'reactstrap'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

export default function RegisterTab ({ tabId, setLoginStatus }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const register = (e) => {
    e.preventDefault()
    let payload = { name, email, phone, password }
    console.log(payload)
    axios
      .post('http://localhost:3000/auth/register', payload)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        setLoginStatus(true)
        history.push('/')
      })
      .catch((err) => {
        // console.log(err)
        setName('')
        setEmail('')
        setPhone('')
        setPassword('')
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