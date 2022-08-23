import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatDisplay = (props) => (
  <tr>
    <td>{props.text}</td><td>{props.number}</td>
  </tr>
)

const Statistics = (props) => {
  if (!props.functions.getTotal()) {
    return <></>
  }
  return (
    <table>
      <tbody>
        <StatDisplay text="good" number={props.numbers.good} />
        <StatDisplay text="neutral" number={props.numbers.neutral} />
        <StatDisplay text="bad" number={props.numbers.bad} />
        <StatDisplay text="all" number={props.functions.getTotal()} />
        <StatDisplay text="average" number={props.functions.getMeanScore()} />
        <StatDisplay text="positive" number={props.functions.getPositivePercent()} />
      </tbody>
    </table>
  )
}

const Heading = ({ text }) => <h2>{text}</h2>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const getTotal = () => good + neutral + bad;
  const getTotalScore = () => good - bad;

  const getMeanScore = () => {
    return getTotal() ? getTotalScore() / getTotal() : "";
  }

  const getPositivePercent = () => {
    return getTotal() ? (good / getTotal()) * 100 + " %" : "";
  }

  return (
    <div>
      <Heading text="give feedback" />
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Heading text="statistics" />
      <Statistics numbers={{
        good, neutral, bad
      }} functions={{
        getTotal, getMeanScore, getPositivePercent
      }} />
    </div>
  )
}

export default App
