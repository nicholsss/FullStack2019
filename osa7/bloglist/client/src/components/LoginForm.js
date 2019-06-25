import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loginUser, setUser,} from '../reducers/userReducer'
import { useField } from '../hooks/'
import { setNotification } from '../reducers/NotificationReducer'
import { Container, Menu, Form, Button } from 'semantic-ui-react'
import Notification from './Notification'
const LoginForm = (props) => {

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
    


    const [username, usernameReset] = useField('text')
    const [password, passwordReset] = useField('password')

    return (
        <Container>
          <h1>log in to application</h1>
          <Notification />
  
          <Form onSubmit={handleLogin}>
            <Form.Field>
              <label>Username</label>
              <input placeholder="Username" id="username" {...username} />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder="Password" id="password" {...password} />
            </Form.Field>
            <Button type="submit">Submit</Button>
          </Form>
        </Container>
      )
}
export default connect(null,{
    loginUser,setNotification
})(LoginForm)
