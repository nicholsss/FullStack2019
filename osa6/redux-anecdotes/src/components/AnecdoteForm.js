import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/NotificationReducer";
const AnecdoteForm = props => {
  const addAnecdote = event => {
    event.preventDefault();
    props.createAnecdote(event.target.input.value);
    props.notificationChange(event.target.input.value);
    //props.store.dispatch(createAnecdote(event.target.input.value));
    // props.store.dispatch(notificationChange(event.target.input.value));
    event.target.input.value = "";

    setTimeout(() => {
      props.notificationChange(null);
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
/*
const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log("lol", state)
  return {

    anecdotes: state.anecdotes,
    filter: state.filter
  }
}
*/
export default connect(
  null,
  { createAnecdote, notificationChange }
)(AnecdoteForm);
