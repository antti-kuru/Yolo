import StatisticLine from "./StatisticLine"

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

export default Statistics