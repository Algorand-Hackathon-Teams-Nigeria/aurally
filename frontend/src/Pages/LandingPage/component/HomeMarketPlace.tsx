import { Button } from '@mantine/core'
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { nftListAtom } from '../../../store/atoms'
import { Link } from 'react-router-dom'
import classes from '../landing.module.css'
import { NftCarousel } from '../../../components/Carousels/NftCarousel'
import { useQuery } from '@tanstack/react-query'

const TYPES = ['All', 'Music', 'Art']

const HomeMarketPlace = () => {
  const [type, setType] = useState(TYPES[0])
  const nftList = useAtomValue(nftListAtom)

  const getNftData = async (): Promise<typeof nftList> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(nftList)
        } catch (error) {
          reject(error)
        }
      }, 2000)
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['trending-nft'],
    queryFn: getNftData,
  })

  const filterList = data?.filter((item) => {
    if (type === 'All') return true
    if (type === 'Music') return item.type === 'sound'
    if (type === 'Art') return item.type === 'art'
    return false
  })

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
          <Button onClick={() => setType(item)} key={item} variant={item === type ? 'filled' : 'outline'} radius="xl">
            {item}
          </Button>
        ))}
      </div>
      <NftCarousel isLoading={isLoading} data={filterList} />
      <Link to="/dapp/marketplace" className={`${classes.getBtn} flex w-max mx-auto mt-20`}>
        Explore Marketplace
      </Link>
    </div>
  )
}

export default HomeMarketPlace
