import React from 'react'

import {
  Link,
} from 'react-router-dom'

const Users = (props) => {
  console.log('lol',)
  return (
    <div>
      <h1>Users</h1>

      <table>
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {props.users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>

              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users