import React from 'react'

export default function Loading () {
  return (
    <div className="loading-container">
      <img 
        src={require('../assets/images/passworder-logo-1.png')} 
        className="m-2 loading-img" 
        alt="loading..."
      ></img>
      <p className="m-0">Loading...</p>
    </div>
  )
}