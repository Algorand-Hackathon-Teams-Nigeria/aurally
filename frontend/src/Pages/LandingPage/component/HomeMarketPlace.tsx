import { Button } from '@mantine/core'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { nftListAtom } from '../../../store/atoms'
import MusicCard from '../../../components/MusicCard'
import { Carousel } from '@mantine/carousel'
import carouselClasses from '../../../styles/carousel.module.css'
import { Link } from 'react-router-dom'
import classes from '../landing.module.css'

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
        <Link to={'/dapp/marketplace'} className="text-[#8A2BE2]">
          see all
        </Link>
      </div>
      <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
        {TYPES.map((item) => (
          <Button onClick={() => setType(item)} key={item} variant={item === type ? 'filled' : 'outline'} radius="xl">
            {item}
          </Button>
        ))}
      </div>
      <Carousel
        classNames={{ ...carouselClasses, slide: 'max-w-[calc(100%-20px)]' }}
        containScroll="trimSnaps"
        slideSize="300px"
        slideGap={{ base: 16, sm: 20 }}
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
      <Link to="/dapp/marketplace" className={`${classes.getBtn} flex w-max mx-auto mt-20`}>
        Explore Marketplace
      </Link>
    </div>
  )
}

export default HomeMarketPlace
