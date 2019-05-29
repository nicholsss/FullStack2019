import React from "react";
import { vote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/NotificationReducer";

const AnecdoteList = ({ store }) => {
    const anecdotes = store.getState().anecdotes.sort((a, b) => {
        return b.votes - a.votes

        
    })
    const Click = (anecdote) => {
      store.dispatch(vote(anecdote.id))
      store.dispatch(notificationChange(`u voted '${anecdote.content}'`))
      setTimeout(()=> {
        store.dispatch(notificationChange(null))
      },5000)
    }
    const anecdoteToShow = store.getState().filter ? anecdotes.filter(a => a.content.toUpperCase().includes(store.getState().filter.toUpperCase())):anecdotes
  return (
    <div>
      <h2>Anecdotes</h2>

      {anecdoteToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => Click(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AnecdoteList;