import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { EventCarousel } from '../../components/Carousels/EventCarousel'
import { useQuery } from '@tanstack/react-query'
import { parseEventBoxData } from '../../utils/parsing'
import { EventType } from '../../types/assets'
import { appClientAtom } from '../../store/contractAtom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

const Events = () => {
  const [appClient] = useAtom(appClientAtom)

  const getData = async (): Promise<EventType[]> => {
    const boxes = await appClient?.appClient.getBoxValues((name) => name.name.startsWith('Event'))
    if (boxes) {
      return parseEventBoxData(boxes)
    }
    return []
  }

  const { data, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: getData,
    enabled: !!appClient,
  })

  useEffect(() => {
    getData()
  }, [appClient])

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
        <EventCarousel isLoading={isLoading} data={data} />
      </div>
      <div className="my-8">
        <div className="headTag">Free Events</div>
        <EventCarousel isLoading={isLoading} data={data} />
      </div>
      <div>
        <div className="headTag">Paid Events</div>
        <EventCarousel isLoading={isLoading} data={data} />
      </div>
    </div>
  )
}

export default Events
