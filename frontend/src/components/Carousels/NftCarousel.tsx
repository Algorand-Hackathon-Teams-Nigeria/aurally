import carouselClasses from '../../styles/carousel.module.css'
import { Carousel } from '@mantine/carousel'
import NftCard, { NftCardLoader } from '../Cards/NftCard'

const CarouselLoader = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-max flex gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="max-w-[calc(100%-20px)] w-[270px]">
            <NftCardLoader />
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
      slideGap={{ base: 12, sm: 16 }}
      slidesToScroll={'auto'}
      align="end"
    >
      {data.map((item) => (
        <Carousel.Slide key={item.id}>
          <NftCard data={item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
