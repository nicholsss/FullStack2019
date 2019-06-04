import { createStore, combineReducers, applyMiddleware } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/NotificationReducer'


const reducer = combineReducers({
  
  notification: notificationReducer,
  
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store