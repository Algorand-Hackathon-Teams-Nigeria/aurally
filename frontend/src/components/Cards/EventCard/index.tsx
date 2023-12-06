import { AspectRatio, Button, Image } from '@mantine/core'
import { Link } from 'react-router-dom'

type Prop = {
  buttonAction?: () => void
  buttonLabel?: string
} & EventCardType

export const EventCardLoader = () => {
  return (
    <div className="h-max rounded-lg bg-[#1e1e1e] border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md">
      <div className="w-full h-max pt-[75%] relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.03] w-full  h-full" />
      </div>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-3">
          <div className=" w-7/12 rounded-xl h-3.5 bg-white/[0.03]" />
          <div className=" w-2/12 rounded-xl h-[11px] bg-white/[0.03]" />
        </div>

        <div className="space-y-1 mb-3">
          <div className=" w-11/12 rounded-xl h-2 bg-white/[0.03]" />
          <div className=" w-full rounded-xl h-2 bg-white/[0.03]" />
        </div>

        <div className="w-full h-9 rounded-lg bg-white/[0.03]" />
      </div>
    </div>
  )
}

const EventCard = ({ buttonAction, buttonLabel, ...data }: Prop) => {
  return (
    <div className="h-max rounded-lg bg-[#1e1e1e] border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md">
      <AspectRatio ratio={4 / 3} classNames={{ root: 'overflow-hidden' }}>
        <Image src={data.imgUrl} className="object-cover object-top" alt="Norway" />
      </AspectRatio>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-1.5">
          <div className="text-[14.5px] font-bold truncate">{data.title}</div>
          <div className="text-[11px] text-[#afafaf] font-sans shrink-0">{data.price ? `$${data.price}` : 'Free Entry'}</div>
        </div>

        <div className="mb-3.5 font-sans text-[#AFAFAF] text-[11px] tracking-[0.5px]">{data.desc}</div>

        {buttonAction ? (
          <Button variant="primary-full-sm" size="sm" onClick={buttonAction}>
            {buttonLabel ? buttonLabel : 'Get Ticket'}
          </Button>
        ) : (
          <Link to={`/dapp/communities/${data.id}`}>
            <Button variant="primary-full-sm" size="sm">
              {buttonLabel ? buttonLabel : 'Get Ticket'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default EventCard
