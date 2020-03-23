import React, { useState } from 'react'
import { TabPane, Row, Col } from 'reactstrap'
import passworderApi from '../config/api'
import { useHistory } from 'react-router-dom'

export default function RegisterTab ({ tabId, setLoginStatus }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const login = (e) => {
    e.preventDefault()
    let payload = { email, password }
    passworderApi({
      method: 'POST',
      url: '/auth/login',
      data: payload
    })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        setLoginStatus(true)
        history.push('/')
      })
      .catch((err) => {
        console.log(err.response)
        setEmail('')
        setPassword('')
      })
  }

  return (
    <TabPane tabId={tabId}>
      <Row>
        <Col sm="12">
          <form
            className="form-sign"
            onSubmit={(e) => login(e)}
          >
            <div
              className="
                p-3
                form-all-input-container"
            >
              <div className="form-group form-input-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group form-input-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-action-container">
                <button className="btn btn-dark mr-3" type="submit">Sign in</button>
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </TabPane>
  )
}