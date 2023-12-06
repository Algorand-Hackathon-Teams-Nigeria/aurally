import { Carousel } from '@mantine/carousel'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import carouselClasses from '../../styles/carousel.module.css'
import MusicCard from '../../components/MusicCard'

type Prop = {
  data: {
    img?: string
    title: string
    title2: string
    title3?: string
    title4?: string
    buttonLabel: string
    desc?: string
    link?: string
  }[]
}

const data = (isFree = false) =>
  Array.from({ length: 4 }, () => {
    return {
      img: 'https://gateway.pinata.cloud/ipfs/QmTaf7kEg9hNi3msa8GryvMLBHZVDCv34KMzmhN7sP99qu',
      title: 'Beat the flow',
      title2: isFree ? 'Free Entry' : '30 AURA',
      desc: 'This event is to help new artist grow their fanbase and promote their music.',
      buttonLabel: 'Get Ticket',
    }
  }) as Prop['data']

const EventCarousel = ({ data }: Prop) => {
  return (
    <Carousel
      classNames={{ ...carouselClasses, slide: 'max-w-[calc(100%-20px)] min-[320px]:max-w-[285px]' }}
      containScroll="trimSnaps"
      slideSize="285px"
      slideGap={{ base: 16, sm: 20 }}
      slidesToScroll={'auto'}
      align="end"
    >
      {data.map((item, index) => (
        <Carousel.Slide key={index}>
          <MusicCard {...item} />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

const Events = () => {
  return (
    <div className="routePage mb-32">
      <div className="flex items-center justify-between mb-14">
        <div className="routeName">Event</div>
        <Button component={Link} to={'create'} size="md" radius={'md'}>
          Create Events
        </Button>
      </div>
      <div>
        <div className="headTag">Upcoming Events</div>
        <EventCarousel data={data()} />
      </div>
      <div className="my-8">
        <div className="headTag">Free Events</div>
        <EventCarousel data={data(true)} />
      </div>
      <div>
        <div className="headTag">Paid Events</div>
        <EventCarousel data={data()} />
      </div>
    </div>
  )
}

export default Events
