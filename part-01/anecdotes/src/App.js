import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
);

const PrintTitle = ({ title }) => (
  <h2>
    {title}
  </h2>
);

const AnecdoteDay = ({ anecdote, vote }) => (
  <p>{anecdote}<br />has {vote} votes</p>
);

const AnecdoteMostVotes = ({ anecdotes, votes }) => {
  const index = votes.indexOf(Math.max(...votes));

  return (
    <p>{anecdotes[index]}<br />has {votes[index]} votes</p>
  );
}
  

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    new Array(anecdotes.length).fill(0)
  );

  const randomAnecdote = () => setSelected(Math.floor(Math.random() * (anecdotes.length)));

  const castVote = () => {
    const votesTmp = [...votes];
    votesTmp[selected]++;
    setVotes(votesTmp);
  }

  console.log(selected);
  console.log(votes);

  return (
    <div>
      <PrintTitle title="Anecdote of the day" />
      <AnecdoteDay anecdote={anecdotes[selected]} vote={votes[selected]} />

      <Button text="vote" handleClick={castVote} />
      <Button text="next anecdote" handleClick={randomAnecdote} />

      <PrintTitle title="Anecdote with most votes" />
      <AnecdoteMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );

}

export default App;
