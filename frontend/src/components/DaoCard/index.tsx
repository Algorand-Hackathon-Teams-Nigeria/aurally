import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

type Prop = {
  title1: string
  title2: string
  creator: string
  price: number
  desc: string
  date: string
  isClosed?: boolean
  totalVote?: number
}

const DaoCard = ({ title1, title2, price, creator, desc, date, isClosed, totalVote }: Prop) => {
  const open = () => {
    modals.openContextModal({
      modal: 'dao',
      innerProps: {
        header: title1,
        name: 'Beat the Flow',
        author: creator,
        total_stream: '10,343',
        relase_date: date,
        price: price,
      },
    })
  }
  return (
    <div className="bg-[#1E1E1E] text-[#AFAFAF] border border-[#444444] rounded-lg p-4">
      <div className="flex justify-between items-center gap-4">
        <div className="text-white">{title1}</div>
        <div className="text-[11px]">{title2}</div>
      </div>
      <div className="flex justify-between gap-4 mt-1.5">
        <div className="text-[11px]">Created by: {creator}</div>
        <div className="text-sm">{price} AURA</div>
      </div>
      <div className="text-[11px] leading-4 my-4">{desc}</div>
      {isClosed ? (
        <div className="text-[11px] flex justify-between items-center">
          <div>{totalVote} wallets voted</div>
          <div className="text-end text-[#890518]">Closed {date}</div>
        </div>
      ) : (
        <div className="text-end text-[#890518] text-[11px] mb-1">Closing Date: {date}</div>
      )}
      {!isClosed && (
        <Button className="mt-8" fullWidth onClick={open}>
          Vote Now
        </Button>
      )}
    </div>
  )
}

export default DaoCard
