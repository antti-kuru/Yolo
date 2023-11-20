import { useState } from 'react'


const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(all + updatedGood)
  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)

  }


  return (
    <div>
      <h1>Give feedback to YOLO</h1>
      <Button handleClick={handleGoodClick} text='good'/>

      <h2>statistics</h2>
      <p1>good {good}</p1>
    </div>
  )
}

export default App