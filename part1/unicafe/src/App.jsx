import { useState } from 'react'

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad, avarage, positives}) => {
  if (good + bad + neutral === 0) {
    return <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  }

  return <>
    <h1>statistics</h1>
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={good+neutral+bad} />
        <StatisticLine text={'avarage'} value={avarage} />
        <StatisticLine text={'positive'} value={`${positives}%`}/>
      </tbody>
    </table>
  </>
}

const Button = ({text, onClick}) => (
  <button onClick={() => onClick()}>{text}</button>
)

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
        <Button text='good' onClick={() => setGood(good+1)} />
      </span>
      <span>
        <Button text='neutral' onClick={() => setNeutral(neutral+1)} />
      </span>
      <span>
        <Button text='bad' onClick={() => setBad(bad+1)} />
      </span>
      <Statistics good={good} neutral={neutral} bad={bad} avarage={avarage()} positives={positives()} />
    </div>
  )
}

export default App