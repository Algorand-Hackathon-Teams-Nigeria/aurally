import { Button } from '@mantine/core'
import { useAtom, useAtomValue } from 'jotai'
import MusicPlayerCarousel from './component/MusicPlayerCarousel'
import { nftListAtom } from '../../store/atoms'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { NftCarousel } from '../../components/Carousels/NftCarousel'
import TitleHeader from '../../components/General/TitleHeader'
import { EventCarousel } from '../../components/Carousels/EventCarousel'
import { eventData } from '../Events'
import { CommunitiesCarousel } from '../../components/Carousels/CommunitiesCarousel'
import { CommunitiesData } from '../Communities'
import { appClientAtom } from '../../store/contractAtom'
import { parseNftBoxData } from '../../utils/parsing'
import { ArtType, SoundType } from '../../types/assets'


interface NFTType {
  value: string;
  label: string
}
const TYPES: NFTType[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'Art',
    label: 'Art',
  },
  {
    value: 'Sound',
    label: 'Music',
  },
]

const NftShowCase = () => {
  const [type, setType] = useState(TYPES[0])
  const [appClient] = useAtom(appClientAtom)

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await appClient?.appClient.getBoxValues((name) => (
      type.value === "all"
        ? (name.name.startsWith("Art") || name.name.startsWith("Sound"))
        : name.name.startsWith(type.value)
    ))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trending-nft'],
    queryFn: getData,
  })

  function refetchData(type: NFTType) {
    setType(type);
    refetch()
  }

  return (
    <>
      <div className="space-y-14 mt-20">
        <div>
          <TitleHeader title="Trending Nft" link="/dapp/marketplace" />
          <div className="flex gap-4 flex-1 h-[42px] overflow-x-auto mt-2 mb-4">
            {TYPES.map((item) => (
              <Button onClick={() => refetchData(item)} key={item.label} variant={item.value === type.value ? 'filled' : 'outline'} radius="xl">
                {item.label}
              </Button>
            ))}
          </div>
          <NftCarousel isLoading={isLoading} data={data} />
        </div>
        <div>
          <TitleHeader title="Upcoming Events" link="/dapp/events" />
          <EventCarousel isLoading={isLoading} data={eventData()} />
        </div>
        <div>
          <TitleHeader title="Popular Communities" link="/dapp/communities" />
          <CommunitiesCarousel isLoading={isLoading} data={CommunitiesData} />
        </div>
      </div>
    </>
  )
}

const Home = () => {
  return (
    <div>
      <MusicPlayerCarousel />
      <section className="routePage mb-32">
        <NftShowCase />
      </section>
    </div>
  )
}

export default Home
