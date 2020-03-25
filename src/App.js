import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import HomePage from '../src/views/HomePage'
import AuthenticationPage from './views/AuthenticationPage'
import PasswordDetails from './views/PasswordDetails';

function App() {
  const [loginStatus, setLoginStatus] = useState(false)
  const [message, setMessage] = useState('')
  const [isAnySuccessMessage, setIsAnySuccessMessage] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if(access_token) setLoginStatus(true)
  }, [loginStatus])

  return (
    <div 
      className=" 
        all-container"
    >
      <Router>
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <HomePage
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                message={message}
                isAnySuccessMessage={isAnySuccessMessage}
                setIsAnySuccessMessage={setIsAnySuccessMessage}
                setLoading={setLoading}
                loading={loading}
                setMessage={setMessage} 
              />
            </Route>
            <Route path="/authentication">
              <AuthenticationPage 
                loginStatus={loginStatus} 
                setLoginStatus={setLoginStatus}
                setLoading={setLoading}
                loading={loading}
                setIsAnySuccessMessage={setIsAnySuccessMessage}
                setMessage={setMessage} 
              />
            </Route>
            <Route path="/accountdetail/:id">
              <PasswordDetails 
                loginStatus={loginStatus}
                setIsAnySuccessMessage={setIsAnySuccessMessage}
                setMessage={setMessage}
                setLoading={setLoading}
                loading={loading}
              />
            </Route>
            <Route path="/*">
              404 ROUTE NOT FOUND
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
