import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault();
    props.store.dispatch(createAnecdote(event.target.input.value));
    event.target.input.value = "";
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
