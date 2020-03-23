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
import { useHistory } from 'react-router-dom'
import LoginTab from '../components/LoginTab'
// import axios from 'axios'

export default function LoginPage ({ loginStatus, setLoginStatus }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    if(loginStatus) history.push('/')
  }, [loginStatus, history])

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  // const login = (e) => {
  //   e.preventDefault()
  //   let payload = { name, email, password }
  //   axios
  //     .post('http://localhost:3000/auth/login', payload)
  //     .then(({ data }) => {
  //       localStorage.setItem('access_token', data.token)
  //       setLoginStatus(true)
  //       history.push('/')
  //     })
  //     .catch((err) => {
  //       // console.log(err)
  //       setName('')
  //       setEmail('')
  //       setPassword('')
  //     })
  // }

  return (
    <div
      className="container sign-container"
    >
      <div 
        className="
          col-sm-12
          col-lg-4
          sign-area
          "
      >
        <div className="sign-logo-container">
          <img className="logo-img" src={require("../assets/images/passworder-logo-1.png")} alt="logo-img"></img>
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
          <LoginTab tabId={"1"} setLoginStatus={setLoginStatus} />
          {/* <TabPane tabId="1">
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
          </TabPane> */}
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
                      <label>Full Name</label>
                      <input
                        className="form-control"
                        type="text"
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group form-input-group">
                      <label>Phone Number</label>
                      <input
                        className="form-control"
                        type="text"
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
                      <button className="btn btn-dark mr-3" type="submit">Sign up</button>
                    </div>
                  </div>
                </form>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </div>
  )
}