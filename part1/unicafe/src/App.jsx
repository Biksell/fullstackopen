import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({text, value}) => {
  let cell = <td>{value}</td>
  if(text == "Positive") {
    cell = <td>{value} %</td>
  }
  return (
    <tr>
      <td>{text}</td>
      {cell}
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const avg = (good * 1 + bad * (-1)) / total
  const pos = (good / total) * 100

  if(total > 0) {
    return (
      <div>
        <Header text="Statistics"/>
        <table>
          <tbody>
            <StatisticsLine text="Good" value={good}/>
            <StatisticsLine text="Neutral" value={neutral}/>
            <StatisticsLine text="Bad" value={bad}/>
            <StatisticsLine text="Total" value={total}/>
            <StatisticsLine text="Average" value={avg}/>
            <StatisticsLine text="Positive" value={pos}></StatisticsLine>
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <>
        <Header text="Statistics"/>
        <p>No feedback given</p>
      </>
    )
  }

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <Header text="Give Feedback"/>
      <Button handleClick={() => handleGoodClick()} text="Good"/>
      <Button handleClick={() => handleNeutralClick()} text="Neutral"/>
      <Button handleClick={() => handleBadClick()} text="Bad"/>
      <Statistics  good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
