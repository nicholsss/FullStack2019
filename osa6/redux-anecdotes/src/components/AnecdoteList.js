import React from "react";
import { connect } from 'react-redux'
import { vote } from "../reducers/anecdoteReducer";
import { notificationChange, setNotification } from "../reducers/NotificationReducer";

const AnecdoteList = ( props ) => {
  const sortAnecdotes = props.visibleAnecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const Click = anecdote => {
    props.vote(anecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 10)
   
  };
  return (
    <div>
      <h2>Anecdotes</h2>

      {sortAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => Click(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};
const anecdotesToShow = (anecdotes, filter) => {
 return filter ==="" 
 ? anecdotes 
 : anecdotes.filter(a => a.content.toUpperCase().includes(filter.toUpperCase()))
 
}
const mapStateToProps = (state) => {

  return {

    
    visibleAnecdotes : anecdotesToShow(state.anecdotes, state.filter)
  }
}
const mapDispatchToProps = {
  setNotification,vote
}
export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)


