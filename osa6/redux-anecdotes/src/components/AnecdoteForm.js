import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/NotificationReducer";
const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault();
    props.store.dispatch(createAnecdote(event.target.input.value));
    props.store.dispatch(notificationChange(event.target.input.value));
    event.target.input.value = "";

    setTimeout(() => {
      props.store.dispatch(notificationChange(null));
    }, 5000);
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="input" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
