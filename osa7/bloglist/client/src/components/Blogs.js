import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loginUser, setUser } from "../reducers/userReducer";
import { useField } from "../hooks/";
import { setNotification } from "../reducers/NotificationReducer";
import { Container, Menu, Form, Button, List } from "semantic-ui-react";
import Notification from "./Notification";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Blogs = props => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <div>
      {props.blogs.sort(byLikes).map(blog => (
        <List key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </List>
      ))}
    </div>
  );
};
const MapStateToProps = state => {
  return {
    blogs: state.blogs
  };
};

export default connect(MapStateToProps)(Blogs);
