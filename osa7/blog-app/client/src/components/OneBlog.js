import React, { } from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { commentBlog, likeBlog,removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/NotificationReducer'
import Notification from '../components/Notification'
const OneBlog = props => {
  const [comment, commentReset] = useField('comment')

  console.log('blogi', props.blog)
  if (props.blog === undefined) {
    return null
  }
  const notify = (message,  color = 'success') => {
    props.setNotification({ message, color }, 10)
  }
  return (
    <div>
      <h1>
        <Notification/>
        {props.blog.title} {props.blog.author}
      </h1>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>
        {props.blog.likes} likes
        <button onClick={() => props.likeBlog(props.blog, notify(`${props.blog.title} liked`))}>like</button>

      </div>
      <div>added by {props.blog.user.name}</div>
      <h1>Comments</h1>

      <input {...comment} />
      <button
        onClick={() =>
          props.commentBlog(props.blog.id, comment.value, commentReset())
        }
      >
        create
      </button>

      <h1>{props.blog.text}</h1>
      <ul>
        {props.blog.comments.map(u => (
          <li key={u.id}>{u.text}</li>
        ))}
      </ul>
    </div>
  )
}
const mapStateToProps = state => {
  return { blogs: state.blogs }
}
const mapDispatchToProps = {
  likeBlog,removeBlog,
  commentBlog,setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OneBlog)
