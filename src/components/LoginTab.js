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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const [errorLoginMessage, setErrorLoginMessage] = useState('')
  const [isErrorLogin, setIsErrorLogin] = useState(false)

  const login = (e) => {
    e.preventDefault()
    setLoading(true)
    let payload = { email, password }
    passworderApi({
      method: 'POST',
      url: '/auth/login',
      data: payload
    })
      .then(({ data }) => {
        localStorage.setItem('current_user', data.user.name)
        localStorage.setItem('access_token', data.token)
        setLoginStatus(true)
        setIsAnySuccessMessage(true)
        setMessage('Hi, ' + data.user.name)
        history.push('/')
        setIsErrorLogin(false)
      })
      .catch((err) => {
        setIsErrorLogin(true)
        setErrorLoginMessage(err.response.data.name)
        setTimeout(() => {
          setIsErrorLogin(false)
        }, 3000);
        setEmail('')
        setPassword('')
      })
      .finally(_ => {
        setLoading(false)
      })
  }

  const errorMessage = () => {
    if(isErrorLogin) {
      return (
        <div className="alert alert-danger" role="alert">
          {errorLoginMessage}
        </div>
      )
    }
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group form-input-group">
                <label>Password</label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-action-container">
                <button className="btn btn-dark mr-3" type="submit">Sign in</button>
                {errorMessage()}
              </div>
            </div>
          </form>
        </Col>
      </Row>
    </TabPane>
  )
}