import React, { useState } from 'react'

const Blog = ({ blog, like, deleteBlog, user }) => {
  const [showInfo, setShowInfo] = useState(null)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showButton = () => {
    if (user.username === blog.user.username) {
      return <button onClick={() => deleteBlog(blog)}>Delete</button>
    }
  }

  const showBlogs = () => {
    if (showInfo === true) {
      return (
        <div>
          {' '}
          {blog.likes}
          <button onClick={() => like(blog)}>Like</button> <br />{' '}
          <a href={blog.url}>{blog.url} </a> <br />
          Added by {blog.user.username}
          <div>{showButton()}</div>
        </div>
      )
    }
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowInfo(!showInfo)}>
        {blog.title} {blog.author}
      </div>
      {showBlogs()}
    </div>
  )
}

export default Blog
