import { createStore, combineReducers, applyMiddleware } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer
  
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store