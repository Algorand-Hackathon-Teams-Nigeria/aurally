import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'

type Prop = {
  title: string
  title2: string
  title3: string
}

const DaoCard = ({ title, title2, title3 }: Prop) => {
  const open = () => {
    modals.openContextModal({
      modal: 'dao',
      innerProps: {
        name: 'Beat the Flow',
        author: 'Tyler Faye',
        total_stream: '10,343',
        relase_date: '4 Nov, 2023',
        price: '0.25',
      },
    })
  }
  return (
    <div className="bg-[#1E1E1E] text-[#AFAFAF] rounded-lg p-4">
      <div className="flex justify-between gap-4">
        <div className="text-white">{title}</div>
        <div className="text-xs">Stake</div>
      </div>
      <div className="flex justify-between gap-4 mt-3 mb-9">
        <div className="text-xs">Created by: {title2}</div>
        <div className="text-sm">{title3}</div>
      </div>
      <Button fullWidth onClick={open}>
        Vote Now
      </Button>
    </div>
  )
}

export default DaoCard
