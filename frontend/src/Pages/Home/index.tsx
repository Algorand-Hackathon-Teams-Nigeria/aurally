import { Button } from '@mantine/core'
import { useAtomValue } from 'jotai'
import MusicPlayerCarousel from './component/MusicPlayerCarousel'
import { nftListAtom } from '../../store/atoms'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { NftCarousel } from '../../components/Carousels/NftCarousel'

const TYPES = ['All', 'Music', 'Art']

const NftShowCase = () => {
  const [type, setType] = useState(TYPES[0])
  const nftList = useAtomValue(nftListAtom)

  const getArtData = async (): Promise<ArtNftType[]> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(nftList.filter((item) => item.type === 'art') as ArtNftType[])
        } catch (error) {
          reject(error)
        }
      }, 2000)
    })
  }

  const getSoundData = async (): Promise<SoundNftType[]> => {
    return await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          resolve(nftList.filter((item) => item.type === 'sound') as SoundNftType[])
        } catch (error) {
          reject(error)
        }
      }, 4000)
    })
  }

  const { data: artData, isLoading: artLoading } = useQuery({
    queryKey: ['trending-art'],
    queryFn: getArtData,
  })

  const { data: soundData, isLoading: soundLoading } = useQuery({
    queryKey: ['trending-sound'],
    queryFn: getSoundData,
  })

  return (
    <>
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="flex gap-4 flex-1 h-[42px] overflow-x-auto">
          {TYPES.map((item) => (
            <Button onClick={() => setType(item)} key={item} variant={item === type ? 'filled' : 'outline'} radius="xl">
              {item}
            </Button>
          ))}
        </div>
        <Link to={'/dapp/marketplace'} className="text-[#8A2BE2] mb-1">
          see all
        </Link>
      </div>
      {type !== 'Music' && (
        <div className="w-full mb-14">
          <div className="text-[2rem] font-bold mb-6 mt-6">Trending Art</div>
          <NftCarousel isLoading={artLoading} data={artData} />
        </div>
      )}
      {type !== 'Art' && (
        <div className="w-full">
          <div className="text-[2rem] font-bold mb-6 mt-6">Trending Sound</div>
          <NftCarousel isLoading={soundLoading} data={soundData} />
        </div>
      )}
    </>
  )
}

const Home = () => {
  return (
    <div>
      <MusicPlayerCarousel />
      <section className="routePage mb-32">
        <NftShowCase />
      </section>
    </div>
  )
}

export default Home
