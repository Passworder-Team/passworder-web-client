import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

export default function PasswordList ({ passwords }) {
  return (
    <>
      <Table className="my-3">
        <tbody>
          {passwords.map(pass => {
            return (
              <tr key={pass.id}>
                <td>
                  <h3 className="accountName">
                    {pass.account}
                  </h3>
                  <h5 className="accountEmail">
                    {pass.email}
                  </h5>
                </td>
                <td 
                  className="px-0" 
                  align="center"
                ><Link
                  className="btn btn-to-detail" 
                  to={`/accountdetail/${pass.id}`}
                >details</Link></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}