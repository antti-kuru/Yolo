import { useState } from 'react'
import './app.css'

const Button = ({handleClick, text, className}) => {
  return(
    <button onClick={handleClick} className={className}>
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

const Statistics = ( {good, neutral, bad, all, values}) => {
  const calculateAverage = () => {
    let totalSum = 0
    values.forEach(element =>{
      totalSum +=element
    })
    const average = totalSum / values.length
    return average.toFixed(2)
  }

  const calculatePositive = () => {
    let totalSum = 0
    values.forEach(element =>{
      if (element === 1){
        totalSum +=1
      }
      
    })
    const positivePercentage = 100* (totalSum / values.length)
    return positivePercentage.toFixed(1)
  }

  if (values.length === 0){
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={calculateAverage()} />
        <StatisticLine text="positive" value={`${calculatePositive()} %`} />
        </tbody>
      </table>
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
      <Button handleClick={handleGoodClick} text='good' className='good'/>
      <Button handleClick={handleNeutralClick} text='neutral' className='neutral' />
      <Button handleClick={handleBadClick} text='bad' className='bad'/>


      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} values={values}  />
    </div>
  )
}

export default App