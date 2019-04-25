import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from "./components/Notification";
import "./style.css";
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage ] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    blogService
      .create(blogObject).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(
          `a new blog ${title} by ${author} added`
        )
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
  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username of passsword')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
       <input
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
       <input
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
       <input
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
    </form>      
  )


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errorMessage = {errorMessage} message = {message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message = {message} errorMessage = {errorMessage} />
      <p>{user.name} logged in</p>
      <button onClick={() => 
        {
          window.localStorage.clear()
          setUser(null)
        }
        }> Logout
      </button>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App