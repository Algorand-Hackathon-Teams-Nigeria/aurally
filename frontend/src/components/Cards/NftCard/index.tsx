import { AspectRatio, Avatar, Button, Image } from '@mantine/core'
import { Link } from 'react-router-dom'
import { ArtType, SoundType } from '../../../types/assets'
import { microalgosToAlgos } from 'algosdk'


type Prop = {
  data: SoundType | ArtType
  buttonAction?: () => void
  buttonLabel?: string
}

export const NftCardLoader = () => {
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

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 w-max">
            <div className="w-3.5 h-3.5 bg-white/[0.03] rounded-full shrink-0" />
            <div className=" w-14 rounded-xl h-2.5 bg-white/[0.03]" />
          </div>
          <div className=" w-3/12 rounded-xl h-3.5 bg-white/[0.03]" />
        </div>

        <div className="w-full h-9 rounded-lg bg-white/[0.03]" />
      </div>
    </div>
  )
}

const NftCard = ({ data, buttonAction, buttonLabel }: Prop) => {
  return (
    <div className="h-max rounded-lg bg-[#1e1e1e] border-[0.5px] border-[#444] overflow-hidden flex-1 shadow-md">
      <AspectRatio ratio={4 / 3} classNames={{ root: 'overflow-hidden' }}>
        <Image src={data.type == "sound" ? data.data.cover_image_ipfs : data.data.ipfs_location} className="object-cover object-top" alt="Norway" />
      </AspectRatio>
      <div className="px-4 pb-3">
        <div className="flex justify-between items-center gap-1 mt-2.5 mb-1.5">
          <div className="text-[14.5px] font-bold truncate">{data.data.title}</div>
          <div className="text-[11px] text-[#afafaf] shrink-0">Bid</div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <Avatar size={14} alt="music owner" />
            <div className="text-[11px] text-[#afafaf] truncate font-sans">Artist</div>
          </div>
          <div className="text-sm text-[#afafaf] shrink-0 font-[500]">{microalgosToAlgos(Number(data.data.price))} ALGO</div>
        </div>

        {buttonAction ? (
          <Button variant="primary-full-sm" size="sm" onClick={buttonAction}>
            {buttonLabel}
          </Button>
        ) : (
          <Link to={`/dapp/marketplace/${data.type === 'art' ? 'art' : 'music'}/${data.data.asset_id}`}>
            <Button variant="primary-full-sm" size="sm">
              {buttonLabel ? buttonLabel : data.type === 'sound' ? 'Stream and Buy' : 'Buy'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default NftCard
