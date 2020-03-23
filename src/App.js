import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import HomePage from '../src/views/HomePage'
import AuthenticationPage from './views/AuthenticationPage'
// import RegisterPage from '../src/views/RegisterPage'
import PasswordDetails from './views/PasswordDetails';

function App() {
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if(access_token) setLoginStatus(true)
  }, [loginStatus])

  return (
    <div 
      className=" 
        border 
        all-container"
    >
      <Router>
        <div className="content-container">
          <Switch>
            <Route exact path="/">
              <HomePage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
            </Route>
            <Route path="/authentication">
              <AuthenticationPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
            </Route>
            {/* <Route path="/register">
              <RegisterPage loginStatus={loginStatus} />
            </Route> */}
            <Route path="/accountdetail/:id">
              <PasswordDetails loginStatus={loginStatus} />
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
