import React, { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/NotificationReducer";
import { useField } from "./hooks";
import { connect } from "react-redux";
import {
  
  initializeBlogs,
  likeBlog,
  removeBlog
} from "./reducers/blogReducer";
import { loginUser, setUser, logout } from "./reducers/userReducer";

const App = props => {
  const [username,usernameReset] = useField("text");
  const [password,passwordReset] = useField("password");

  useEffect(() => {
    props.initializeBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      props.setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notify = (message, color = "success") => {
    props.setNotification({ message, color }, 10);
  };

  const handleLogin = async event => {
    event.preventDefault();

    props.loginUser({
      username: username.value,
      password: password.value,
      notify
    }).catch(() => {
      notify(`wrong username or password`, 'error')
    })
    usernameReset()
    passwordReset()

  };

  const handleLogout = () => {
    props.logout();
  };

  if (props.user === null ) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input {...username} />
          </div>
          <div>
            salasana
            <input {...password} />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    );
  }

  const newBlogRef = React.createRef();

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const like = blog => {
    console.log("like props", props);

    props.likeBlog(blog);
    notify(`blog ${blog.title} by ${blog.author} liked!`);
  };
  const remove = blog => {
    props.removeBlog(blog);
    notify(`blog ${blog.title} by ${blog.author} removed!`);
  };
  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="create new" ref={newBlogRef}>
        <NewBlog />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          like={like}
          remove={remove}
          user={props.user}
          creator={blog.user.username === props.user.username}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user };
};
const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  likeBlog,
  removeBlog,
  loginUser,
  logout,
  setUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
