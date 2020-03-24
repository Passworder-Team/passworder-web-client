import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header({ loginStatus, setLoginStatus }) {
  const [userInitial, setUserInitial] = useState('')
  const [currentUser, setCurrentUser] = useState('')

  useEffect (() => {
    setCurrentUser(localStorage.getItem('current_user'))
    for (let i = 0; i < currentUser.length; i++)
    {
      if (i === 0)
      {
        setUserInitial(currentUser[i])
      }
    }
  }, [currentUser])

  const logout = () => {
    setLoginStatus(false)
    localStorage.clear()
  }

  return (
    <div 
      className="
        p-3
        header-container"
    >
      <div className="logo-container">
        <Link to="/">
          <img 
            src={require('../assets/images/passworder-logo-1-white.png')} 
            alt="header-logo" 
            className="header-logo"
          ></img>
        </Link>
      </div>
      <div className="px-2 current-user-container">
        <div className="dropdown">
          <button className="current-user-photo rounded-circle border" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {userInitial}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="dropdown-item">
              <p
                className="btn-signout" 
                onClick={logout}
              >
                Sign out
              </p>
            </div>
          </div>
        </div>
        <div className="current-user-name">
          <h4 className="m-0">{currentUser}</h4>
        </div>
      </div>
    </div>
  )
}