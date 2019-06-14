import React from "react";

const User = props => {
  if (props.user === undefined) {
    return null;
  }
  return (
    <div>
      {console.log("useri", props.user.blog)}
      <h1>{props.user.name}</h1>
      <h1>added blogs</h1>
      {console.log("tiedot", props.user)}
      <ul>
        {props.user.blogs.map(u => (
          <li key={u.id}>{u.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
