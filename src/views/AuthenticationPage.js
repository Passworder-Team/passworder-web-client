import React, { useEffect, useState } from 'react'
import { 
  Nav, 
  NavItem, 
  NavLink, 
  TabContent
} from 'reactstrap'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'

import LoginTab from '../components/LoginTab'
import RegisterTab from '../components/RegisterTab'

export default function AuthenticationPage ({ loginStatus, setLoginStatus }) {
  const history = useHistory()

  useEffect(() => {
    if(loginStatus) history.push('/')
  }, [loginStatus, history])

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

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
          <RegisterTab tabId={"2"} setLoginStatus={setLoginStatus} />
        </TabContent>
      </div>
    </div>
  )
}