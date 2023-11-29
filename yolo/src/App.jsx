import { useState, useEffect } from 'react'
import axios from 'axios'
import './app.css'
import Button from './components/Button'
import Statistics from './components/Statistics'
import ProposalStatistics from './components/ProposalStatistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [values, setValue] = useState([])

  // save proposals list to its own state
  const [proposals, setProposals] = useState([])
  
  const [newProposal, setNewProposal] = useState('')
  const [allProposals, setAllProposals] = useState(0)


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3002/proposals')
      .then(response => {
        setProposals(response.data)
      })
  }, [])
  console.log('render', proposals.length, 'proposals')




  const handleGoodClick = () => {
    // creating new variable for the update as the original can't be straight modified
    const updatedGood = good + 1
    // setting the good value as the updated value
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
    // creating new proposal object where the name is from user input and quantity is initialized as 1
    const proposalObject = {
        name: newProposal,
        quantity: 1
    }

    // to prevent same proposals filling the list, have to check if the new value already exists in the list
    const existingProposal = proposals.filter (proposal => proposal.name === newProposal)
    if (existingProposal.length > 0){
      const updatedProposals = proposals.map(proposal => 
        proposal.name === newProposal
        ? {... proposal, quantity: proposal.quantity + 1}
        : proposal
        )
      // updating the proposals list
      setProposals(updatedProposals)
      // informing the user what happened
      window.alert(`${newProposal} is already in proposals, quantity updated`)
      
    }
    else{
      axios
        .post('http://localhost:3002/proposals', proposalObject)
        .then(response => {
          setProposals(proposals.concat(response.data))
        })
    }
    // increasing total amount even when the printed list remains the same
    setAllProposals(allProposals + 1)
    setNewProposal('')
    
  }

  const handleProposalChange = (event) => {
    console.log(event.target.value)
    // from event.target.value we get the input the user has typed
    setNewProposal(event.target.value)
  }

  return (
    <div>
      <h1>Give feedback to YOLO</h1>
      <Button handleClick={handleGoodClick} text='good' className='good'/>
      <Button handleClick={handleNeutralClick} text='neutral' className='neutral' />
      <Button handleClick={handleBadClick} text='bad' className='bad'/>
      
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} values={values}  />


      <form onSubmit={addProposal} >
        <div>
          propose a food that you would like to eat here: <input value={newProposal} onChange={handleProposalChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>proposed foods</h3>
      <ProposalStatistics proposals={proposals} all={allProposals} />
    </div>
  )
}

export default App