import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/FilterReducer";
import notificationReducer from "./reducers/NotificationReducer";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
