import React, { useEffect } from 'react'
import Blog from './components/Blog'
import OneBlog from './components/OneBlog'
import blogService from './services/blogs'
import User from './components/User'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/NotificationReducer'
import { useField } from './hooks'
import { connect } from 'react-redux'
import {
  initializeBlogs,
  likeBlog,
  removeBlog,
  commentBlog
} from './reducers/blogReducer'
import { loginUser, setUser, logout } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from 'react-router-dom'
import { Container, Menu, Form, Button } from 'semantic-ui-react'

const App = props => {
  const [username, usernameReset] = useField('text')
  const [password, passwordReset] = useField('password')
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    props.initializeUsers()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Users = () => {
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
  const notify = (message, color = 'success') => {
    props.setNotification({ message, color }, 10)
  }

  const handleLogin = async event => {
    event.preventDefault()

    props
      .loginUser({
        username: username.value,
        password: password.value,
        notify
      })
      .catch(() => {
        notify('wrong username or password', 'error')
      })
    usernameReset()
    passwordReset()
  }

  const handleLogout = () => {
    props.logout()
  }

  const newBlogRef = React.createRef()

  const userById = id => props.users.find(u => u.id === id)

  const blogById = id => props.blogs.find(b => b.id === id)

  const byLikes = (b1, b2) => b2.likes - b1.likes

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
            //like={like}
            //remove={remove}
            user={props.user}
            creator={blog.user.username === props.user.username}
          />
        ))}
      </div>
    )
  }

  if (props.user === null) {
    return (
      <Container>
        <h1>log in to application</h1>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" {...username} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" {...password} />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    )
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
            {' '}
            <em>{props.user.name} logged in</em>{' '}
          </Menu.Item>

          <Menu.Item>
            <button onClick={handleLogout}>logout</button>
          </Menu.Item>
        </Menu>

        <h2>Blog App</h2>
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/" render={() => <Home />} />
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
  )
}

const mapStateToProps = state => {
  return { blogs: state.blogs, user: state.user, users: state.users }
}
const mapDispatchToProps = {
  setNotification,
  initializeBlogs,
  likeBlog,
  removeBlog,
  loginUser,
  logout,
  setUser,
  initializeUsers,
  commentBlog
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
