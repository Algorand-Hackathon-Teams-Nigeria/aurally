import { Avatar, Button, Image } from '@mantine/core'
import { useState } from 'react'
import asset from '../../assets/nft-example.jpeg'
import profile from '../../assets/profile.jpg'
import classes from '../MusicDetails/musicdetail.module.css'
import Stat1 from '../../components/General/Stat1'
import { Icon } from '@iconify/react'

const DetailsTab = () => {
  const [type, setType] = useState(0)
  const bg = (num: number) => (type === num ? '#444' : 'transparent')

  return (
    <div className="gboard mt-6 mb-[90px] min-h-[434px]">
      <div className="flex overflow-x-scroll remove-scroll pb-0.5">
        <Button size="lg" onClick={() => setType(0)} classNames={{ root: classes.greyButton }} bg={bg(0)}>
          Overview
        </Button>
        <Button size="lg" onClick={() => setType(1)} classNames={{ root: classes.greyButton }} bg={bg(1)}>
          Analytics
        </Button>
      </div>
      {type === 0 ? (
        <>
          <div className="pt-4 pb-5">
            Lorem ipsum dolor sit amet consectetur. Ullamcorper auctor duis felis dui interdum eget proin pharetra. Id venenatis venenatis
            molestie vitae nisi sed cursus metus. Lectus maecenas a pulvinar netus. Tristique facilisi augue faucibus urna est nulla ac.
            Pretium duis aliquet condimentum scelerisque quis. Platea netus integer dolor bibendum urna massa molestie suspendisse. Nunc sed
            semper in turpis enim orci lorem. Quisque sagittis ut in augue nisl at. Blandit et feugiat nulla ut aliquet morbi.
          </div>
          <div className="flex flex-wrap gap-5 sm:gap-20">
            <Stat1 title="GENRES" title2="RnB" />
            <Stat1 title="Date Created" title2="Sept 2022" />
            <Stat1 title="Total Voume" title2="Unlimited" />
          </div>
        </>
      ) : (
        <div className="w-full text-center mt-24">No Activity</div>
      )}
    </div>
  )
}

const ArtDetails = () => {
  return (
    <div className="routePage">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="h-[75vw] lg:h-[35vw] max-h-[500px] rounded-[10px] overflow-hidden">
          <Image src={asset} className="max-h-full object-top object-cover" />
        </div>
        <div className="flex flex-col justify-end">
          <div className="py-5 lg:py-8 px-4 lg:px-6 border border-[#444444]">
            <div className="text-[#919191]">Price</div>
            <div className="p-4 sm:p-6 rounded-[10px] bg-[#1E1E1E] mb-6 mt-1">0.25 ALGO</div>
            <Button size="md" fullWidth>
              Collect
            </Button>
          </div>
        </div>
      </div>
      <h1 className="detailsTitle mt-8 mb-3">Beat the Flow</h1>
      <div className="flex gap-5 items-center">
        <Avatar src={profile} size="lg" radius="md" classNames={{ image: 'border-2 sm:border-[3px] rounded-lg' }} />
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sm:text-[22px] font-bold text-white">Tyler Faye</span>
            <Icon icon="codicon:verified-filled" width={20} color="#0075FF" />
          </div>
          <div className="font-bold text-xs sm:text-sm text-[#afafaf]">@tylerfaye.NFT</div>
        </div>
      </div>
      <DetailsTab />
    </div>
  )
}

export default ArtDetails
