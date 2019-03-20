import React, { useState } from "react";
import ReactDOM from "react-dom";
import './index.css';
const Button = props => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statisctics = props => {
  //let total = props.good+props.neutral+props.bad

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return <p>No commits</p>;
  }
  return (
    <div>
       
      <Statistic text="hyva" value={props.good} />
      <Statistic text="neutral" value={props.neutral} />
    <Statistic text="bad" value={props.bad} />
      <Statistic text="total" value={props.good + props.neutral + props.bad} />
      <Statistic
        text="average"
        value={props.allClick / (props.good + props.neutral + props.bad)}
      />
      <Statistic
        text="positive"
        value={(props.good / (props.good + props.neutral + props.bad)) * 100}
        prosentti="%"
      />
      
    </div>
  );
};
const Statistic = props => {
  return (
    <table >
      <tbody>
        <tr>
          <td width ="75px">{props.text}</td>
          
          <td>{props.value} {props.prosentti}</td>
        </tr>
      </tbody>
    </table>
  );
};
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClick, setAll] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(allClick + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(allClick - 1);
  };
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>Statistiikka</h1>
      <Statisctics
        good={good}
        neutral={neutral}
        bad={bad}
        allClick={allClick}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
