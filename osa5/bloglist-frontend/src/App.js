import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import './style.css'
import Togglable from './components/Togglable'
import  { useField } from './hooks'

const App = () => {
  //const blofFormref = React.createRef()
  const username = useField('text')
  const password = useField('password')
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(`a new blog ${title} by ${author} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(error => {
        setErrorMessage(JSON.stringify(error.response.data))
      })
    setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    console.log(username.value)

    try {
      //const u = username.value
      //const p = password.value
      const user = await loginService.login({
        username:username.value, password:password.value
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      //setUsername('')
      //setPassword('')
    } catch (exception) {

      setErrorMessage('Wrong username of passsword')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const like = blog => {
    const newBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(blog.id, newBlog)

      .then(returnedBlog => {
        setBlogs(
          blogs
            .map(blog => (blog.id !== newBlog.id ? blog : returnedBlog))
            .sort((a, b) => b.likes - a.likes)
        )
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        setErrorMessage('Something went wrong')
      })
  }

  const deleteBlog = blog => {
    //console.log(user.name)
    // console.log(blog.user.username)
    const ok = window.confirm(`Removing blog ${blog.title}By ${blog.author}`)
    if (ok) {
      blogService
        .remove(blog.id)
        .then(setBlogs(blogs.filter(b => b.id !== blog.id)))
        .catch(() => {
          setErrorMessage('Cannot delete')
        })
    }
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog">
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
    )
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
        <input
          {...username.spread()}
        />
      </div>
      <div>
        salasana
        <input
          {...password.spread()} />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage} message={message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.username} logged in</p>
      <button
        onClick={() => {
          window.localStorage.clear()
          setUser(null)
        }}
      >
        {' '}
        Logout
      </button>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          like={like}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default App
