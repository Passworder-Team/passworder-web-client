import React, { useEffect, useState } from 'react'
import { 
  Nav, 
  NavItem, 
  NavLink, 
  TabContent, 
  TabPane, 
  Row, 
  Col  } from 'reactstrap'
import classnames from 'classnames'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage ({ token, setToken }) {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if(token) history.push('/')
  }, [token, history])

  const login = (e) => {
    e.preventDefault()
    let payload = { name, email, password }
    axios
      .post('http://localhost:3000/auth/login', payload)
      .then(({ data }) => {
        localStorage.setItem('access_token', data.token)
        setToken(data.token)
        history.push('/')
      })
      .catch((err) => {
        // console.log(err)
        setName('')
        setEmail('')
        setPassword('')
      })
  }

  return (
    <div
      className="container sign-container"
    >
      <div 
        className="
          col-sm-12
          col-md-4
          sign-area
          "
      >
        <div className="sign-logo-container">
          <p className="m-0 form-logo">PASSWORDER</p>
        </div>
        <Nav tabs>
          <div className="col-6">
            <NavItem className="tab-title">
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Sign in
              </NavLink>
            </NavItem>
          </div>
          <div className="col-6">
            <NavItem className="tab-title">
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Sign up
              </NavLink>
            </NavItem>
          </div>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
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
                      <label>name</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        minLength="3"
                        required
                      />
                    </div>
                    <div className="form-group form-input-group">
                      <label>email</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group form-input-group">
                      <label>password</label>
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
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <form
                  className="form-sign"
                >
                  <div
                    className="
                      p-3
                      form-all-input-container"
                  >
                    <div className="form-group form-input-group">
                      <label>name</label>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        minLength="3"
                        required
                      />
                    </div>
                    <div className="form-group form-input-group">
                      <label>email</label>
                      <input
                        className="form-control"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group form-input-group">
                      <label>password</label>
                      <input
                        className="form-control"
                        type="password"
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
        </TabContent>
      </div>
      
      {/* <form 
        className="
          container
          col-sm-12
          col-md-5
          form-sign"
        onSubmit={(e) => login(e)}
      >
        <div 
          className="
            form-title-container"
        >
          <h3 className="form-title">
            Sign in
          </h3>
        </div>
        <div 
          className="
            border 
            rounded 
            p-3
            form-all-input-container"
          >
            <div className="sign-logo-container">
              <p className="m-0 form-logo">PASSWORDER</p>
            </div>
            <div className="form-group form-input-group">
              <label>name</label>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setName(e.target.value)}
                minLength="3"
                required
                />
            </div>
            <div className="form-group form-input-group">
              <label>email</label>
              <input
                className="form-control"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group form-input-group">
              <label>password</label>
              <input
                className="form-control"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-action-container">
              <button className="btn btn-dark mr-3" type="submit">login</button>
              <p className="m-0">
                not a user yet? <Link to="/register">register</Link> here!
              </p>
            </div>
        </div>
      </form> */}
    </div>
  )
}