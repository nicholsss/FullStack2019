import React, { useEffect } from "react";
import Blog from "./components/Blog";
import OneBlog from "./components/OneBlog";
import blogService from "./services/blogs";
import User from "./components/User";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useField } from "./hooks";
import { connect } from "react-redux";
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
  commentBlog
} from "./reducers/blogReducer";
import { loginUser, setUser, logout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Container, Menu, Form, Button } from "semantic-ui-react";

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


  const handleLogout = () => {
    props.logout();
  };

  const newBlogRef = React.createRef();

  const userById = id => props.users.find(u => u.id === id);

  const blogById = id => props.blogs.find(b => b.id === id);


  if (props.user === null) {
    return <LoginForm />;
  }
  return (
    <Container>
      <Router>
        <Menu>
          <Menu.Item link to="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item link to="users">
            <Link to="/users">users</Link>
          </Menu.Item>
          <Menu.Item>
            {" "}
            <em>{props.user.name} logged in</em>{" "}
          </Menu.Item>

          <Menu.Item>
            <button onClick={handleLogout}>logout</button>
          </Menu.Item>
        </Menu>

        <h2>Blog App</h2>

        <Notification />
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <Togglable buttonLabel="create new" ref={newBlogRef}>
                <NewBlog />
              </Togglable>
              <Blogs />
            </div>
          )}
        />

      

        <Route exact path="/users" render={() => <Users />} />
        <Route
          exact
          path="/users/:id"
          render={({ match }) => <User user={userById(match.params.id)} />}
        />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => <OneBlog blog={blogById(match.params.id)} />}
        />
        <Redirect to="/" />
      </Router>
    </Container>
  );
};

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user, users: state.users };
};
const mapDispatchToProps = {
  initializeBlogs,
  likeBlog,
  removeBlog,
  loginUser,
  logout,
  setUser,
  initializeUsers,
  commentBlog
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
