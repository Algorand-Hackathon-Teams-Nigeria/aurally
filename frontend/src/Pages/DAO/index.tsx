import { Button } from '@mantine/core'
import DaoCard from '../../components/Cards/DaoCard'
import { Link } from 'react-router-dom'
import carouselClasses from '../../styles/carousel.module.css'
import { Carousel } from '@mantine/carousel'
import { useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { ProposalType } from '../../types/assets'
import { appClientAtom } from '../../store/contractAtom'
import { parseProposalBoxData } from '../../utils/parsing'

type Prop = {
  title: string
  data?: ProposalType[]
}

const DaoGrid = ({ title, data }: Prop) => {
  return (
    <div className="border border-[#444444] py-6 sm:py-8 px-[4%] sm:px-6 rounded-[10px]">
      <div className="text-2xl font-bold mb-6">{title}</div>
      <Carousel
        classNames={{ ...carouselClasses, slide: 'max-w-[calc(100%-20px)]' }}
        containScroll="trimSnaps"
        slideSize="330px"
        slideGap={{ base: 12, sm: 16 }}
        slidesToScroll={'auto'}
        align="end"
      >
        {data?.map((item, index) => (
          <Carousel.Slide key={index}>
            <DaoCard proposal={item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  )
}

const DAO = () => {
  const [appClient] = useAtom(appClientAtom)

  const { data } = useQuery({
    queryKey: ["proposals"],
    queryFn: getProposals
  })

  async function getProposals(): Promise<ProposalType[]> {
    const boxes = await appClient?.appClient.getBoxValues((name) => name.name.startsWith("Proposal"))
    if (boxes) {
      return parseProposalBoxData(boxes)
    }
    return []
  }

  return (
    <div className="routePage space-y-12 pb-32">
      <div className="flex items-center justify-between mb-14">
        <div className="routeName">DAO</div>
        <Button component={Link} to={'create'} size="md" radius={'md'}>
          Create Proposal
        </Button>
      </div>
      <DaoGrid data={data} title="Trending Proposals" />
      <DaoGrid data={data} title="Open Proposals" />
    </div>
  )
}

export default DAO
