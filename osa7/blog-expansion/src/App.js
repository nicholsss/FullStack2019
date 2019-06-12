import React, { useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/NotificationReducer";
import { useField } from "./hooks";
import { connect } from "react-redux";
import { initializeBlogs, likeBlog, removeBlog } from "./reducers/blogReducer";
import { loginUser, setUser, logout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const App = props => {
  const [username, usernameReset] = useField("text");
  const [password, passwordReset] = useField("password");

  useEffect(() => {
    props.initializeBlogs();
  }, []);

  useEffect(() => {
    props.initializeUsers();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      props.setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const Users = () => {
    return (
      <div>

        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Blog created</th>
            </tr>
          </thead>
          <tbody>

            {props.users.map(user => (

              <tr key={user.id}>
                <td ><Link to={`/users/${user.id}`}>{user.name}</Link></td>

                <td>{user.blogs.length}</td>
              </tr>


            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const User = ({ user }) => {
    if (user === undefined) {
      return null
    }
    return (
      <div>
        {console.log("useri", user.blog)}
        <h1>{user.name}</h1>
        <h1>added blogs</h1>
        {console.log('tiedot', user)}
        <ul>
          {user.blogs.map(u => (
            <li key={u.id}>{u.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  const Menu = () => {
    const padding = {
      paddingRight: 5,
      color: "red",
     
    };
    return (
      <div style={padding}>
        <Link style={padding} to="/">
          blogs
      </Link>
        <Link style={padding}  to="users">users</Link>
        {props.user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }



  const OneBlog = ({ blog }) => {
    if (blog === undefined) {
      return null
    }
    return (

      <div>

        <h1>{blog.title} {blog.author}</h1>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
       <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
      </div>

    )
  }

  const notify = (message, color = "success") => {
    props.setNotification({ message, color }, 10);
  };

  const handleLogin = async event => {
    event.preventDefault();

    props
      .loginUser({
        username: username.value,
        password: password.value,
        notify
      })
      .catch(() => {
        notify(`wrong username or password`, "error");
      });
    usernameReset();
    passwordReset();
  };

  const handleLogout = () => {
    props.logout();
  };

  if (props.user === null) {
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

  const userById = id => props.users.find(u => u.id === id);

  const blogById = id => props.blogs.find(b => b.id === id)

  const byLikes = (b1, b2) => b2.likes - b1.likes;

  const like = blog => {
    console.log("like props", props);
    console.log(blog.likes)
    props.likeBlog(blog);
    notify(`blog ${blog.title} by ${blog.author} liked!`);
  };
  const remove = blog => {
    props.removeBlog(blog);
    notify(`blog ${blog.title} by ${blog.author} removed!`);
  };
  const Home = () => {
    return (
      <div>
        <Notification />



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
  return (
    <div>
      <Router>
        <Menu />
        <h2>Blog App</h2>




        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/users/:id"
          render={({ match }) => (
            <User user={userById(match.params.id)} />
          )}
        />
        <Route exact path="/blogs/:id"
          render={({ match }) => (
            <OneBlog blog={blogById(match.params.id)} />

          )}
        />
      </Router>
    </div>
  );
};


const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user, users: state.users };
};
const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  likeBlog,
  removeBlog,
  loginUser,
  logout,
  setUser,
  initializeUsers
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
