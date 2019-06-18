import React from 'react'
import { connect } from 'react-redux'
const Notification = (props) => {
  console.log(props)
  console.log('notifi ok:',props.notification.ok )
  const style = {
    color: props.notification.color === 'error' ? 'red' : 'green',

    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  if (props.notification.length === 0) {
    return null
  }
  console.log('propsasdasd',props.notification)

  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}
const mapStateToProps = state => {
  console.log('notif state:',state)
  return{
    notification : state.notification
  }
}

export default connect(mapStateToProps)(Notification)