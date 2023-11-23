import { useState } from 'react'
import './app.css'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [values, setValue] = useState([])

  const [proposals, setProposals] = useState([])
  
  const [newProposal, setNewProposal] = useState('')

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



  const addProposal = (event) => {
    event.preventDefault()
    const proposalObject = {
        name: newProposal
    }
    setProposals(proposals.concat(proposalObject))
  }

  const handleProposalChange = (event) => {
    console.log(event.target.value)
    setNewProposal(event.target.value)
  }

  return (
    <div>
      <h1>Give feedback to YOLO</h1>
      <Button handleClick={handleGoodClick} text='good' className='good'/>
      <Button handleClick={handleNeutralClick} text='neutral' className='neutral' />
      <Button handleClick={handleBadClick} text='bad' className='bad'/>
      
      <form onSubmit={addProposal}>
        <div>
          proposal: <input value={newProposal} onChange={handleProposalChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} values={values}  />

      <h3>proposed foods</h3>
      <div>
          {proposals.map(proposal =>
            <li key={proposal.name}>
              {proposal.name}</li> 
            )}
      </div>
    </div>
  )
}

export default App