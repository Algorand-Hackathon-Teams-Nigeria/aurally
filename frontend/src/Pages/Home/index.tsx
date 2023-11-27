import { Button } from '@mantine/core'
import { useAtomValue } from 'jotai'
import MusicCard from '../../components/MusicCard'
import MusicPlayerCarousel from './component/MusicPlayerCarousel'
import { nftListAtom } from '../../store/atoms'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from '@mantine/carousel'
import carouselClasses from '../../styles/carousel.module.css'

const TYPES = ['All', 'Music', 'Art']

const NftShowCase = () => {
  const [type, setType] = useState(TYPES[0])
  const nftList = useAtomValue(nftListAtom)

  const artList = nftList.filter((item) => item.type === 'art')
  const soundList = nftList.filter((item) => item.type === 'sound')

  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="flex gap-4 flex-1 h-[42px] overflow-x-scroll remove-scroll">
          {TYPES.map((item) => (
            <Button onClick={() => setType(item)} key={item} variant={item === type ? 'filled' : 'outline'} radius="xl">
              {item}
            </Button>
          ))}
        </div>
        <Link to={'/dapp/marketplace'} className="text-[#8A2BE2] mb-1">
          see all
        </Link>
      </div>
      {type !== 'Music' && (
        <div className="w-full mb-14">
          <div className="text-[2rem] font-bold mb-6 mt-6">Trending Art</div>
          <Carousel
            classNames={carouselClasses}
            containScroll="trimSnaps"
            slideSize={{ base: '250px', sm: '300px' }}
            slideGap={20}
            slidesToScroll={'auto'}
            align="end"
          >
            {artList.map((item) => (
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
      )}
      {type !== 'Art' && (
        <div className="w-full">
          <div className="text-[2rem] font-bold mb-6 mt-6">Trending Sound</div>
          <Carousel
            classNames={carouselClasses}
            containScroll="trimSnaps"
            slideSize={{ base: '250px', sm: '300px' }}
            slideGap={20}
            slidesToScroll={'auto'}
            align="end"
          >
            {soundList.map((item) => (
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
      )}
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

{
  /* <section className={classes.widget}>
          <div>
            <TitleHeader title="Top Streams" />
            <div className="grid gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <SummaryBox to="/marketplace/music/12" key={item} />
              ))}
            </div>
          </div>
          <div>
            <TitleHeader className="mt-10" title="Communities" />
            <div className="grid grid-cols-music-card lg:grid-cols-1 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <MusicCard
                  action={joinAction}
                  title="TF-Nation"
                  title2="Members"
                  title3="Tyler Faye"
                  title4="1k+"
                  key={item}
                  buttonLabel="Join"
                />
              ))}
            </div>
          </div>
        </section> */
}
