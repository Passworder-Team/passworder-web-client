import React from 'react'

export default function Loading () {
  return (
    <div className="loading-container">
      <div className="spinner-grow text-dark" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}