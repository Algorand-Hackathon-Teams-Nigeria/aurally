import { Button } from '@mantine/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from '../landing.module.css'
import { NftCarousel } from '../../../components/Carousels/NftCarousel'
import { useQuery } from '@tanstack/react-query'
import { ArtType, SoundType } from '../../../types/assets'
import { parseNftBoxData } from '../../../utils/parsing'
import { createAppClient } from '../../../utils/network/contract-config'

const TYPES = [
  {
    value: 'all',
    label: 'All',
  },
  {
    value: 'art',
    label: 'Art',
  },
  {
    value: 'sound',
    label: 'Music',
  },
]

const HomeMarketPlace = () => {
  const [type, setType] = useState(TYPES[0])

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await createAppClient()?.appClient.getBoxValues((name) => name.name.startsWith('Art') || name.name.startsWith('Sound'))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data, isLoading } = useQuery({
    queryKey: ['nfts'],
    queryFn: getData,
  })

  const filteredNft = data?.filter((item) => (type.value === 'all' ? true : item.type === type.value))

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl md:text-4xl font-bold mb-6 mt-6">Marketplace</div>
        <Link to={'/dapp/marketplace'} className="text-[#8A2BE2]">
          see all
        </Link>
      </div>
      <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
        {TYPES.map((item) => (
          <Button onClick={() => setType(item)} key={item.value} variant={item.value === type.value ? 'filled' : 'outline'} radius="xl">
            {item.label}
          </Button>
        ))}
      </div>
      <NftCarousel isLoading={isLoading} data={filteredNft} />
      <Link to="/dapp/marketplace" className={`${classes.getBtn} flex w-max mx-auto mt-20`}>
        Explore Marketplace
      </Link>
    </div>
  )
}

export default HomeMarketPlace
