import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const [selected, setSelected] = useState(0)
  const [index, setIndex] = useState(0)
  const [votes, setVotes] = useState([])

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const mostVotedIndex = votes.indexOf(Math.max(...votes))

  const handleRandomClick = () => {
    let updatedIndex = Math.floor(Math.random() * anecdotes.length)
    while(updatedIndex == index) {
      updatedIndex = Math.floor(Math.random() * anecdotes.length)
    }
    console.log(updatedIndex)
    setIndex(updatedIndex)
    setSelected(updatedIndex)
  }

  if (votes.length == 0) {
    const newFill = new Array(anecdotes.length).fill(0)
    setVotes(newFill)
    return
  }

  const handleVoteClick = () => {
    const updatedVotes = [...votes]
    updatedVotes[index] += 1
    setVotes(updatedVotes)
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {anecdotes[selected]}
      <p>has {votes[index]} votes</p>
      <Button handleClick={() => handleVoteClick()} text="Vote"/>
      <Button handleClick={() => handleRandomClick()} text="Next anecdote"/>
      <Header text="Anecdote with most votes"/>
      {anecdotes[mostVotedIndex]}
      <p>has {votes[mostVotedIndex]} votes</p>
    </div>
  )
}

export default App
