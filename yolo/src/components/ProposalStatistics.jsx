import StatisticLine from "./StatisticLine"

const ProposalStatistics = ({proposals, all}) => {
  if (proposals.length === 0) {
    return(
        <div>No proposals given</div>
    )
  }  

  return(
    <div>
        <table>
        <tbody>
        <tr>
            <td>name</td>
            <td>amount</td>
        </tr>
        {proposals.map(proposal =>
        
         <StatisticLine key={proposal.name} text={proposal.name} value={proposal.quantity} />
        )}


        </tbody>


        </table>


    </div>
  )


}

export default ProposalStatistics