import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import HomePage from '../src/views/HomePage'
import LoginPage from '../src/views/LoginPage'
import RegisterPage from '../src/views/RegisterPage'
import PasswordDetails from './views/PasswordDetails';

function App() {
  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if(access_token) setLoginStatus(true)
  }, [loginStatus])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        </Route>
        <Route path="/login">
          <LoginPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        </Route>
        <Route path="/register">
          <RegisterPage loginStatus={loginStatus} />
        </Route>
        <Route path="/:id">
          <PasswordDetails loginStatus={loginStatus} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
