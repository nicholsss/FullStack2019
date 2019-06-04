import React from "react";
import { useField } from "../hooks";
import { connect } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {setNotification} from '../reducers/NotificationReducer'
const NewBlog = props => {
  const [title, titleReset] = useField("text");
  const [author, authorReset] = useField("text");
  const [url, urlReset] = useField("text");

  const notify = (message,  color = 'success') => {
    props.setNotification({ message, color }, 10)
    //setTimeout(() => setNotification({ message: null }), 10000)
  }

  const create = async event => {
    event.preventDefault();
    /*
    const title = event.target.title.value 
    const author = event.target.author.value 
    const url = event.target.url.value 
    */
    
    

    props.createBlog(title.value, author.value, url.value);
    notify(`a new blog ${title.value} by ${author.value} added`)
    titleReset();
    authorReset();
    urlReset();
    
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={create}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default connect(
  null,
  {
    createBlog,setNotification
  }
)(NewBlog);
