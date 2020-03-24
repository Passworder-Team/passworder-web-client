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
            {userInitial}
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
          <h4>{currentUser}</h4>
        </div>
      </div>
    </div>
  )
}