/*
import React from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    
    Link,
    
  } from "react-router-dom";

const Users = (props) => {
    console.log('propsit',props)
    return (
      <div>
        <h1>Users</h1>

        <table>
          <thead>
            <tr>
              <th />
              <th>Blog created</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map(user => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${props.user.id}`}>{props.user.name}</Link>
                </td>

                <td>{props.user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  const mapStateToProps = state => {
    return {users: state.users };
  };

  export default Users
  */