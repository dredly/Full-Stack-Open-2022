import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils'
import { useState } from 'react'

const Heading = ({ text }) => <h2>{text}</h2>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = ({ text, votes }) => (
  <div>{text}
    <p>has {votes} votes.</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectRandom = () => {
    const randInd = Math.floor(Math.random() * anecdotes.length);
    setSelected(randInd);
  }

  const vote = ind => () => {
    const copy = [...votes];
    copy[ind]++;
    setVotes(copy);
  }

  const mostVoted = () => {
    //Returns the index of the anecdote with most votes
    const maxVotes = Math.max(...votes);
    return votes.indexOf(maxVotes);
  }

  return (
    <div>
      <Heading text="Anecdote of the Day" />
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" handleClick={vote(selected)} />
      <Button text="next anecdote" handleClick={selectRandom} />
      <Heading text="Anecdote with most Votes" />
      <Anecdote text={anecdotes[mostVoted()]} votes={votes[mostVoted()]} />
    </div>

  )
}

export default App
