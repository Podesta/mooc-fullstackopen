import React, { useState } from 'react'

const Header = ({ title }) => <h2>{title}</h2>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Data = ({ description, value }) => (
    <tr>
      <td>{description}</td>
      <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad;
  const average = ((good - bad) / total).toFixed(1);
  const percentage = (good * 100 / total).toFixed(1);

  if (total === 0) {
    return (<div>No feedback given</div>);
  } else {
    return (
      <table>
        <colgroup align="right">
          <col style={{width: "5em"}} />
          <col style={{width: "5em"}} />
        </colgroup>
        <tbody>
          <Data description="good" value={good} />
          <Data description="neutral" value={neutral} />
          <Data description="bad" value={bad} />
          <Data description="all" value={total} />
          <Data description="average" value={average} />
          <Data description="positive" value={`${percentage} %`} />
        </tbody>
      </table>
    );
  }
}

const App = () => {
  // Save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <Header title="give feedback" />
      <Button text="good" handleClick={increaseGood} />
      <Button text="neutral" handleClick={increaseNeutral} />
      <Button text="bad" handleClick={increaseBad} />

      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App
