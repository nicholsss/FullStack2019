import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/NotificationReducer";

const AnecdoteForm = props => {
  const addAnecdote = async event => {
    event.preventDefault();
    const content = event.target.input.value;
    event.target.input.value = "";
    props.createAnecdote(content);

    props.setNotification(content, 10);
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
export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm);
