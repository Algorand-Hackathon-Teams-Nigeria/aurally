import { Outlet } from 'react-router-dom'
import TitleHeader from '../../components/General/TitleHeader'
import SummaryBox from '../../components/SummaryBox'
import MusicCard from '../../components/MusicCard'
import { Carousel } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import carouselClasses from '../../styles/carousel.module.css'

export const CommunitiesIndex = () => {
  const matched = useMediaQuery('(min-width: 1024px)')
  return (
    <section className="h-max pb-32 mt-14 lg:mt-0 lg:w-[310px] xl:flex-shrink-0">
      <TitleHeader className="" title="Explore Communities" />
      {matched ? (
        <div className="w-full grid grid-cols-music-card lg:grid-cols-1 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <MusicCard
              img="https://gateway.pinata.cloud/ipfs/QmTaf7kEg9hNi3msa8GryvMLBHZVDCv34KMzmhN7sP99qu"
              title="TF-Nation"
              title2="Members"
              title3="Tyler Faye"
              title4="1k+"
              key={item}
              buttonLabel="Join"
            />
          ))}
        </div>
      ) : (
        <Carousel
          classNames={{ ...carouselClasses, slide: 'max-w-[calc(100%-20px)]' }}
          containScroll="trimSnaps"
          slideSize="300px"
          slideGap={{ base: 16, sm: 20 }}
          slidesToScroll={'auto'}
          align="end"
        >
          {[1, 2, 3, 4].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                img="https://gateway.pinata.cloud/ipfs/QmTaf7kEg9hNi3msa8GryvMLBHZVDCv34KMzmhN7sP99qu"
                title="TF-Nation"
                title2="Members"
                title3="Tyler Faye"
                title4="1k+"
                buttonLabel="Join"
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      )}
    </section>
  )
}

export const Communities = () => {
  return (
    <div className="px-[4.5%] min-[375px]:px-5 lg:px-8 h-max lg:h-[calc(100lvh-110px)] flex flex-col lg:flex-row gap-6 lg:overflow-y-auto">
      <div className="flex-1 lg:pb-32 h-max pt-6">
        <div className="routeName mb-6">Your Communities</div>
        <div className="grid gap-3 max-w-[750px]">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <SummaryBox
              img="https://gateway.pinata.cloud/ipfs/QmTaf7kEg9hNi3msa8GryvMLBHZVDCv34KMzmhN7sP99qu"
              name="Alte All Through"
              count={15}
              date="Today"
              to="12"
              key={item}
            />
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  )
}
