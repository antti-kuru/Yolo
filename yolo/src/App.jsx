import { useState, useEffect } from 'react'
import './app.css'
import Button from './components/Button'
import Statistics from './components/Statistics'
import ProposalStatistics from './components/ProposalStatistics'
import proposalService from './services/proposals'
import Notification from './components/Notification'
import Error from './components/Error'

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

  const [notificationMessage, setNotification] = useState('')

  const [errorMessage, setError] = useState('')


  useEffect(() => {
    console.log('effect')
    proposalService
      .getAll()
      .then(initialProposals => {
        setProposals(initialProposals)
      })
  }, [])
  console.log('render', proposals.length, 'proposals')


  const informingUser = (msg) => {
    setNotification(
      `${msg} thank you for answering!`
    )
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const informError = (msg) => {
    setError(
      `${msg}, no changes made`
    )
    setTimeout(() => {
      setError(null)
    }, 4000)
  }



  const handleGoodClick = () => {
    // creating new variable for the update as the original can't be straight modified
    const updatedGood = good + 1
    // setting the good value as the updated value
    setGood(updatedGood)
    setAll(all + 1)
    setValue(values.concat(1))
    informingUser(`Added feedback: good.`)

  }
  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(all + 1)
    setValue(values.concat(0))
    informingUser(`Added feedback: neutral.`)
  }
  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(all + 1)
    setValue(values.concat(-1))
    informingUser(`Added feedback: bad.`)
  }

  const addProposal = (event) => {
    event.preventDefault()
    // creating new proposal object where the name is from user input and quantity is initialized as 1
    const proposalObject = {
        name: newProposal,
        quantity: 1,
    }

    const proposal = proposals.find(p => p.name === newProposal)
    if (proposal){
      const changedProposal = {... proposal, quantity: proposal.quantity + 1}
      proposalService
        .update(proposal.id, changedProposal)
        .then(returnedProposal => {
          setProposals(proposals.map(p => p.id !== proposal.id ? p : returnedProposal))
        })
      // informing the user what happened
      informingUser(`${newProposal} is already in proposals, its quantity updated.`)
      
    }
    else if (!newProposal) {
      informError(`Name missing`)
    }
    else{
        proposalService
          .create(proposalObject)
          .then(createdProposal => {
            console.log(createdProposal)
            setProposals(proposals.concat(createdProposal))
          })
          informingUser(`Added ${proposalObject.name}. `)
          

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
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
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
          <button className='addProposal' type="submit">add</button>
        </div>
      </form>
      

      <h3>proposed foods</h3>
      <ProposalStatistics proposals={proposals} all={allProposals} />
    </div>
  )
}

export default App