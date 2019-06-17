import React from "react";
import { useField } from "../hooks";
import { connect } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import {setNotification} from '../reducers/NotificationReducer'
import { Button, Checkbox, Form } from 'semantic-ui-react'
const NewBlog = props => {
  const [title, titleReset] = useField("text");
  const [author, authorReset] = useField("text");
  const [url, urlReset] = useField("text");

  const notify = (message,  color="" ) => {
    props.setNotification({ message, color }, 5)
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
    if( title.value ==="" || author.value==="" || url.value ==="" ){
      notify(`Fill all the information`, "error")
     
    }else{
      notify(`a new blog ${title.value} by ${author.value} added`,"succes")
    }
    
    titleReset();
    authorReset();
    urlReset();
    
  };

  return (
    
      

      <Form onSubmit={create}>

      <Form.Field>
      <label>title</label>
      <input placeholder='title'{...title} />
    </Form.Field>
    <Form.Field>
      <label>author</label>
      <input placeholder='author' {...author} />
    </Form.Field>
    <Form.Field>
      <label>url</label>
      <input placeholder='url'{...url} />
    </Form.Field>
        <Button primary type="submit">create</Button>
      </Form>
    
  );
};

export default connect(
  null,
  {
    createBlog,setNotification
  }
)(NewBlog);
