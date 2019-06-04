import { createStore, combineReducers, applyMiddleware } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/NotificationReducer'
import blogReducer from './reducers/blogReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store