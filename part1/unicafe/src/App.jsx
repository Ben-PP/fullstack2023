import { useState } from 'react'

const Statistics = ({good, neutral, bad, avarage, positives}) => {
  if (good + bad + neutral === 0) {
    return <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  }

  return <>
    <h1>statistics</h1>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
        <li>all {good+bad+neutral}</li>
        <li>avarage {avarage}</li>
        <li>positive {positives}%</li>
      </ul>
  </>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const avarage = () => {
    const total = good + bad * -1
    return total / (good + bad + neutral)
  }

  const positives = () => {
    return good / (good + bad + neutral) * 100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <span>
        <button onClick={() => setGood(good+1)}>good</button>
      </span>
      <span>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
      </span>
      <span>
        <button onClick={() => setBad(bad+1)}>bad</button>
      </span>
      <Statistics good={good} neutral={neutral} bad={bad} avarage={avarage()} positives={positives()} />
    </div>
  )
}

export default App