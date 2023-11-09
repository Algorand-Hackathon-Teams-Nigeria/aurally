import { Carousel } from '@mantine/carousel'
import MyCarousel from '../../components/MyCarousel'
import MusicCard from '../../components/MusicCard'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

const eventList = [1]

const WithEvents = () => {
  return (
    <>
      <div className="mb-10">
        <div className="headTag">Subcribed Events</div>
        <MyCarousel>
          {[1, 2].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                action={() => {}}
                title="Beat the flow"
                title2="$50"
                desc="This event is to help new artist grow their fanbase and promote their music."
                buttonLabel="View Details"
              />
            </Carousel.Slide>
          ))}
        </MyCarousel>
      </div>
      <div className="mb-10">
        <div className="headTag">Upcoming Events</div>
        <MyCarousel>
          {[1, 2].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                action={() => {}}
                title="Beat the flow"
                title2="$50"
                desc="This event is to help new artist grow their fanbase and promote their music."
                buttonLabel="Get Ticket"
              />
            </Carousel.Slide>
          ))}
        </MyCarousel>
      </div>
      <div className="mb-10">
        <div className="headTag">Free Events</div>
        <MyCarousel>
          {[1, 2, 3, 4].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                action={() => {}}
                title="Beat the flow"
                title2="Free Entry"
                desc="This event is to help new artist grow their fanbase and promote their music."
                buttonLabel="Get Ticket"
              />
            </Carousel.Slide>
          ))}
        </MyCarousel>
      </div>
      <div className="mb-10">
        <div className="headTag">Public Events</div>
        <MyCarousel>
          {[1, 2, 3].map((item) => (
            <Carousel.Slide key={item}>
              <MusicCard
                action={() => {}}
                title="Beat the flow"
                title2="Free Entry"
                desc="This event is to help new artist grow their fanbase and promote their music."
                buttonLabel="Get Ticket"
              />
            </Carousel.Slide>
          ))}
        </MyCarousel>
      </div>
    </>
  )
}

const Events = () => {
  return (
    <div className="routePage mb-32">
      <div className="flex justify-between flex-wrap gap-5 mb-10">
        <div className="routeName">Events</div>
        <Link to="add">
          <Button size="md" radius={'md'} color="#444" variant="outline" classNames={{ inner: 'sm:px-8 text-white/90' }}>
            Create an Event
          </Button>
        </Link>
      </div>
      {eventList.length === 0 ? <div>There is no Event currently. Add a new one.</div> : <WithEvents />}
    </div>
  )
}

export default Events
