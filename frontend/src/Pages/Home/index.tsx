import { Button } from '@mantine/core'
import { useAtom } from 'jotai'
import MusicPlayerCarousel from './component/MusicPlayerCarousel'
import { useState } from 'react'
import { NftCarousel } from '../../components/Carousels/NftCarousel'
import TitleHeader from '../../components/General/TitleHeader'
import { EventCarousel } from '../../components/Carousels/EventCarousel'
import { CommunitiesCarousel } from '../../components/Carousels/CommunitiesCarousel'
import { CommunitiesData } from '../Communities'
import { appClientAtom } from '../../store/contractAtom'
import { parseEventBoxData, parseNftBoxData } from '../../utils/parsing'
import { ArtType, EventType, SoundType } from '../../types/assets'
import { useQuery } from '@tanstack/react-query'

interface NFTType {
  value: string
  label: string
}
const TYPES: NFTType[] = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'art',
    label: 'Art',
  },
  {
    value: 'sound',
    label: 'Music',
  },
]

const NftShowCase = () => {
  const [type, setType] = useState(TYPES[0])
  const [appClient] = useAtom(appClientAtom)

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await appClient?.appClient.getBoxValues((name) => name.name.startsWith('Art') || name.name.startsWith('Sound'))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data, isPending, isLoading } = useQuery({
    queryKey: ['nfts'],
    queryFn: getData,
    enabled: !!appClient,
  })

  const filteredNft = data?.filter((item) => (type.value === 'all' ? true : item.type === type.value))

  function refetchData(type: NFTType) {
    setType(type)
  }

  return (
    <>
      <div className="flex gap-4 flex-1 h-[42px] overflow-x-auto mt-2 mb-4">
        {TYPES.map((item) => (
          <Button onClick={() => refetchData(item)} key={item.label} variant={item.value === type.value ? 'filled' : 'outline'} radius="xl">
            {item.label}
          </Button>
        ))}
      </div>
      <NftCarousel isLoading={isLoading || isPending} data={filteredNft} />
    </>
  )
}

const EventShowCase = () => {
  const [appClient] = useAtom(appClientAtom)

  const getData = async (): Promise<EventType[]> => {
    const boxes = await appClient?.appClient.getBoxValues((name) => name.name.startsWith('Event'))
    if (boxes) {
      return parseEventBoxData(boxes)
    }
    return []
  }

  const { data, isPending, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getData,
    enabled: !!appClient,
  })

  return <EventCarousel isLoading={isLoading || isPending} data={data} />
}

const Home = () => {
  return (
    <div>
      <MusicPlayerCarousel />
      <section className="routePage mb-32">
        <div className="space-y-14 mt-20">
          <div>
            <TitleHeader title="Trending Nft" link="/dapp/marketplace" />
            <NftShowCase />
          </div>
          <div>
            <TitleHeader title="Upcoming Events" link="/dapp/events" />
            <EventShowCase />
          </div>
          <div>
            <TitleHeader title="Popular Communities" link="/dapp/communities" />
            <CommunitiesCarousel data={CommunitiesData} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
