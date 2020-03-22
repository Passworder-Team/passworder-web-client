import React from 'react'
import { Link } from 'react-router-dom'

export default function PasswordList ({ passwords }) {
  return (
    <>
      <div>
        {passwords.map(pass => {
          return (
            <div key={pass.id}>
              <div>
                {pass.id}
              </div>
              <div>
                {pass.account}
              </div>
              <button><Link to={`/${pass.id}`}>details</Link></button>
            </div>
          )
        })}
      </div>
    </>
  )
}