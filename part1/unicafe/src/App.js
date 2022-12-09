import { useState } from 'react'

const Header = ({text}) => {
  return (
    <>
      <h1>{text}</h1>
    </>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({stats}) => {
  const all = stats.good + stats.bad + stats.neutral
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const round = (x) => Math.round(x * 10) / 10
  const average = round((stats.good - stats.bad) / all)
  const positive = round(stats.good / all * 100)

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={stats.good} />
          <StatisticLine text="neutral" value={stats.neutral} />
          <StatisticLine text="bad" value={stats.bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + '%'} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleGood = () => setStats({...stats, good: stats.good + 1})
  const handleNeutral = () => setStats({...stats, neutral: stats.neutral + 1})
  const handleBad = () => setStats({...stats, bad: stats.bad + 1})

  return (
    <div>
      <Header text={"give feedback"} />
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <Header text={"statistics"} />
      <Statistics stats={stats} />
    </div>
  );
}

export default App;
