import { Button } from '@mantine/core'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { nftListAtom } from '../../../store/atoms'
import MusicCard from '../../../components/MusicCard'
import { Carousel } from '@mantine/carousel'
import carouselClasses from '../../../styles/carousel.module.css'

const TYPES = ['All', 'Music', 'Art']

const HomeMarketPlace = () => {
  const [type, setType] = useState(TYPES[0])
  const nftList = useAtomValue(nftListAtom)

  const filterList = nftList.filter((item) => {
    if (type === 'All') return true
    if (type === 'Music') return item.type === 'sound'
    if (type === 'Art') return item.type === 'art'
    return false
  })

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl md:text-4xl font-bold mb-6 mt-6">Marketplace</div>
      </div>
      <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-scroll remove-scroll">
        {TYPES.map((item) => (
          <Button onClick={() => setType(item)} key={item} variant={item === type ? 'filled' : 'outline'} radius="xl">
            {item}
          </Button>
        ))}
      </div>
      <Carousel
        classNames={carouselClasses}
        containScroll="trimSnaps"
        slideSize={{ base: '250px', sm: '300px' }}
        slideGap={20}
        slidesToScroll={'auto'}
        align="end"
      >
        {filterList.map((item) => (
          <Carousel.Slide key={item.id}>
            <MusicCard
              img={item.imgUrl}
              title={item.title}
              title2="Bid"
              title3={item.type === 'art' ? item.creator : item.artist}
              title4={`${Number(item.price)} ALGO`}
              buttonLabel={item.type === 'sound' ? 'Stream and Buy' : 'Buy'}
              link={`/dapp/marketplace/${item.type === 'sound' ? 'music' : 'art'}/${item.id}`}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

export default HomeMarketPlace
