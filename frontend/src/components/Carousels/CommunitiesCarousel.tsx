import carouselClasses from '../../styles/carousel.module.css'
import { Carousel } from '@mantine/carousel'
import CommunityCard, { CommunityCardLoader } from '../Cards/CommunityCard'
import { CommunityCardType } from '../../types/assets'

const CarouselLoader = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-max flex gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="max-w-[calc(100%-20px)] w-[270px]">
            <CommunityCardLoader />
          </div>
        ))}
      </div>
    </div>
  )
}

export const CommunitiesCarousel = ({ data = [], isLoading }: { isLoading?: boolean; data?: CommunityCardType[] }) => {
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
      {data?.map((item) => (
        <Carousel.Slide key={item.id}>
          <CommunityCard {...item} key={item.id} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
