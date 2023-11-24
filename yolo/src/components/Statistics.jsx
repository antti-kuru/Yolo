import StatisticLine from "./StatisticLine"

const Statistics = ( {good, neutral, bad, all, values}) => {
    const totalSum = values.reduce((totalSum, value) => totalSum + value, 0)

    const calculateAverage = () => {  
      const average = totalSum / values.length
      return average.toFixed(2)
    }
  
    const calculatePositive = () => {
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