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

function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    setToken(access_token)
  }, [token])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage token={token} setToken={setToken} />
        </Route>
        <Route path="/login">
          <LoginPage token={token} setToken={setToken} />
        </Route>
        <Route path="/register">
          <RegisterPage token={token} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
