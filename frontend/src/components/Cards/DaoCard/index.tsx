import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { ProposalType } from '../../../types/assets'

interface DaoCardProps {
  proposal: ProposalType
}

const DaoCard = ({ proposal }: DaoCardProps) => {
  const open = () => {
    modals.openContextModal({
      modal: 'dao',
      innerProps: {
        header: proposal.data.title,
        name: proposal.data.details,
        total_stream: '10,343',
        relase_date: proposal.data.end_date,
      },
    })
  }
  return (
    <div className="bg-[#1E1E1E] text-[#AFAFAF] border border-[#444444] rounded-lg p-4">
      <div className="flex justify-between items-center gap-4">
        <div className="text-white">#{proposal.data.title}</div>
      </div>
      <div className="text-[11px] leading-4 my-4">{proposal.data.details}</div>
      {/* {isClosed ? ( */}
      {/*   <div className="text-[11px] flex justify-between items-center"> */}
      {/*     <div>{totalVote} wallets voted</div> */}
      {/*     <div className="text-end text-[#890518]">Closed {date}</div> */}
      {/*   </div> */}
      {/* ) : ( */}
      {/*   <div className="text-end text-[#890518] text-[11px] mb-1">Closing Date: {date}</div> */}
      {/* )} */}
      {/* {!isClosed && ( */}
      <Button className="mt-8" fullWidth onClick={open}>
        Vote Now
      </Button>
      {/* )} */}
    </div>
  )
}

export default DaoCard
