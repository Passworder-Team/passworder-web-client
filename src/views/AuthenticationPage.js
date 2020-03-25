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

export default function AuthenticationPage ({ 
  loginStatus, 
  setLoginStatus,
  setLoading,
  loading,
  setIsAnySuccessMessage,
  setMessage
}) {
  const history = useHistory()

  useEffect(() => {
    if(loginStatus) history.push('/')
  }, [loginStatus, history])

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const loadingStatus = () => {
    if(loading) {
      return <div>Loading...</div>
    } else {
      return <></>
    }
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
          {loadingStatus()}
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
          <LoginTab 
            tabId={"1"} 
            setLoginStatus={setLoginStatus}
            setLoading={setLoading}
            setIsAnySuccessMessage={setIsAnySuccessMessage}
            setMessage={setMessage}  
          />
          <RegisterTab 
            tabId={"2"} 
            setLoginStatus={setLoginStatus}
            setLoading={setLoading}
            setIsAnySuccessMessage={setIsAnySuccessMessage}
            setMessage={setMessage}  
          />
        </TabContent>
      </div>
    </div>
  )
}