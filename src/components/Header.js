import React from 'react'
import { Link } from 'react-router-dom'

export default function Header({ token, setToken }) {
  const logout = () => {
    setToken('')
    localStorage.clear()
  }

  return (
    <div 
      className="
        px-2
        border-bottom 
        header-container"
    >
      <div className="logo-container">
        <h1>LOGO</h1>
      </div>
      <div className="current-user-container">
        <div className="dropdown">
          <button className="current-user-photo rounded-circle border" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            U
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="dropdown-item">
              <Link to="user/profile">Profile</Link>
            </div>
            <div className="dropdown-item">
              <p onClick={logout}>
                Sign out
              </p>
            </div>
          </div>
        </div>
        <div className="current-user-name">
          <h4>user.mail@mail.com</h4>
        </div>
      </div>
    </div>
  )
}