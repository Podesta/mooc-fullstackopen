import React, { useState } from 'react'

const Header = ({ title }) => <h2>{title}</h2>;

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Stats = ({ good, bad, neutral }) => (
  <div>
    good: {good}<br />
    neutral: {neutral}<br />
    bad: {bad}<br />
  </div>
);

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
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App
