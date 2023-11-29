import { Button } from '@mantine/core'
import DaoCard from '../../components/DaoCard'
import { Link } from 'react-router-dom'
import carouselClasses from '../../styles/carousel.module.css'
import { Carousel } from '@mantine/carousel'

type Prop = {
  title: string
  data: {
    title1: string
    title2: string
    creator: string
    price: number
    desc: string
    date: string
    totalVote: number
    isClosed: boolean
  }[]
}

const data = (isClosed = false) =>
  Array.from({ length: 4 }, () => {
    return {
      title1: 'Top 10 Songa Asked',
      title2: 'Asked',
      creator: 'Faye',
      price: 110.25,
      desc: 'Alright is a peer-to-peer agreements app to safely exchange goods & services with anyone through decentralized escrow',
      date: '12 Nov 2023',
      totalVote: 1000,
      isClosed: isClosed,
    }
  })

const DaoGrid = ({ title, data }: Prop) => {
  return (
    <div className="border border-[#444444] py-6 sm:py-8 px-[4%] sm:px-6 rounded-[10px]">
      <div className="text-2xl font-bold mb-6">{title}</div>
      <Carousel
        classNames={{ ...carouselClasses, slide: 'max-w-[calc(100%-20px)]' }}
        containScroll="trimSnaps"
        slideSize="330px"
        slideGap={{ base: 16, sm: 20 }}
        slidesToScroll={'auto'}
        align="end"
      >
        {data.map((item, index) => (
          <Carousel.Slide key={index}>
            <DaoCard {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

const DAO = () => {
  const create = () => {}
  return (
    <div className="routePage space-y-12 pb-32">
      <div className="flex items-center justify-between mb-14">
        <div className="routeName">DAO</div>
        <Link to="create">
          <Button size="md" radius={'md'} onClick={create}>
            Create Proposal
          </Button>
        </Link>
      </div>
      <DaoGrid data={data()} title="Trending Proposals" />
      <DaoGrid data={data(true)} title="Open Proposals" />
    </div>
  )
}

export default DAO
