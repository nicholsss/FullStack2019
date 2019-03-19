import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const course = "Half Stack -sovelluskehitys";
  const part1 = "Reactin perusteet";
  const exercises1 = 10;
  const part2 = "Tiedonvälitys propseilla";
  const exercises2 = 7;
  const part3 = "Komponenttien tila";
  const exercises3 = 14;

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };
  const Content = ()=> {
    return (
      <div>
        <Part part = {part1} exercises = {exercises1} />
        <Part part = {part2} exercises = {exercises2}/>
        <Part part = {part3} exercises = {exercises3}/>
      </div>
    )
  }
  const Part =(props) => {
      return(
        <p>{props.part} {props.exercises}</p>
      )
  }
  const Total =(props) =>{
    return(
        <p>Yhteensä: {props.total} tehtävää</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content/>     
      <Total total = {exercises1+exercises2+exercises3} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
