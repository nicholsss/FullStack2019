import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const points = [6, 2, 3, 4, 5, 6];
points.fill(0);

const copy = [...points];
const Stats = props => {
  return (
    <div>
      <p>has {props.value} votes</p>
    </div>
  );
};
const Most = props => {
 
  //let (i)
  console.log(props.text);
  console.log(props.value);
  return (
    <div>
      <p>{props.text[props.value.indexOf(Math.max(...props.value))]}</p>
      <p>{Math.max(...props.value)}</p>
    </div>
  );
};
const App = props => {
  const [selected, setSelected] = useState(0);
  const [voted, setVoted] = useState(selected);
  console.log(copy);
  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      <Stats value={copy[selected]} />
     

      <Button
        handleClick={() => {
          setSelected(Math.floor(Math.random() * 6));
        }}
        text="random"
      />
      <Button
        handleClick={() => {
          setVoted((copy[selected] += 1));
        }}
        text="vote"
      />

      <Most value={copy} text={anecdotes} />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
