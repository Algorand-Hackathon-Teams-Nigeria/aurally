import MusicCard, { MusicCardLoader } from '../MusicCard'
import carouselClasses from '../../styles/carousel.module.css'
import { Carousel } from '@mantine/carousel'

const CarouselLoader = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-max flex gap-4 sm:gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="max-w-[calc(100%-20px)] w-[265px]">
            <MusicCardLoader />
          </div>
        ))}
      </div>
    </div>
  )
}

export const NftCarousel = ({ data = [], isLoading }: { isLoading?: boolean; data?: (ArtNftType | SoundNftType)[] }) => {
  return isLoading ? (
    <CarouselLoader />
  ) : (
    <Carousel
      classNames={{ ...carouselClasses, slide: 'max-w-[calc(100%-20px)] min-[320px]:max-w-[285px]' }}
      containScroll="trimSnaps"
      slideSize="285px"
      slideGap={{ base: 16, sm: 20 }}
      slidesToScroll={'auto'}
      align="end"
    >
      {data.map((item) => (
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
  )
}
