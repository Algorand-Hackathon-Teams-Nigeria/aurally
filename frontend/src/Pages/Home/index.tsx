import { Button } from '@mantine/core'
import { useAtomValue } from 'jotai'
import MusicPlayerCarousel from './component/MusicPlayerCarousel'
import { nftListAtom } from '../../store/atoms'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { NftCarousel } from '../../components/Carousels/NftCarousel'
import TitleHeader from '../../components/General/TitleHeader'
import { EventCarousel } from '../../components/Carousels/EventCarousel'
import { eventData } from '../Events'
import { CommunitiesCarousel } from '../../components/Carousels/CommunitiesCarousel'
import { CommunitiesData } from '../Communities'

const TYPES = [
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
  const nftList = useAtomValue(nftListAtom)

  const filteredData = nftList.filter((item) => (type.value === 'all' ? true : item.type === type.value))

  const getDummyData = async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 2000)
    })
  }

  const { isLoading } = useQuery({
    queryKey: ['trending-nft'],
    queryFn: getDummyData,
  })

  return (
    <>
      <div className="space-y-14 mt-20">
        <div>
          <TitleHeader title="Trending Nft" link="/dapp/marketplace" />
          <div className="flex gap-4 flex-1 h-[42px] overflow-x-auto mt-2 mb-4">
            {TYPES.map((item) => (
              <Button onClick={() => setType(item)} key={item.label} variant={item.value === type.value ? 'filled' : 'outline'} radius="xl">
                {item.label}
              </Button>
            ))}
          </div>
          <NftCarousel isLoading={isLoading} data={filteredData} />
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
