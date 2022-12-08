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

const Statistics = ({stats}) => {
  const all = stats.good + stats.bad + stats.neutral
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  const average = (stats.good - stats.bad) / all
  const positive = stats.good / all * 100
  return (
    <div>
      <p>good {stats.good}</p>
      <p>neutral {stats.neutral}</p>
      <p>bad {stats.bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
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
