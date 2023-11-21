import { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <div>
      <div>
        {text} {value}
      </div>
    </div>
  )
}

const Statistics = ( {good, neutral, bad, all, values}) => {
  const calculateAverage = () => {
    let totalSum = 0
    values.forEach(element =>{
      totalSum +=element
    })
    const average = totalSum / values.length
    return average
  }

  const calculatePositive = () => {
    let totalSum = 0
    values.forEach(element =>{
      if (element === 1){
        totalSum +=1
      }
      
    })
    const positivePercentage = 100* (totalSum / values.length)
    return positivePercentage
  }

  if (values.length === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={calculateAverage()} />
      <StatisticLine text="positive" value={`${calculatePositive()} %`} />

    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [values, setValue] = useState([])
  

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(all + 1)
    setValue(values.concat(1))

  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(all + 1)
    setValue(values.concat(0))
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(all + 1)
    setValue(values.concat(-1))
  }
  
  return (
    <div>
      <h1>Give feedback to YOLO</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />


      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} values={values}  />
    </div>
  )
}

export default App