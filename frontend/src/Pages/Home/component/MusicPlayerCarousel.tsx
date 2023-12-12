declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
import { ActionIcon, Avatar, Image, Button } from '@mantine/core'
import { useAtom } from 'jotai'
import { Icon } from '@iconify/react'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { useRef, useState } from 'react'
import classes from '../home.module.css'
import { Link } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'
import { ArtType, SoundType } from '../../../types/assets'
import { appClientAtom } from '../../../store/contractAtom'
import { parseNftBoxData } from '../../../utils/parsing'
import { useQuery } from '@tanstack/react-query'

type Prop1 = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  asset_key: string
  index: number
  audioSrc: string
  heroSrc: string
  minted: number
  artist: string
  title: string
  isVerified?: boolean
  isPlaying: boolean
  currentIndex: number
  setAudioState: React.Dispatch<
    React.SetStateAction<{
      isPlaying: boolean
      currentIndex: number
    }>
  >
}

const CoverSection = ({
  audioRef,
  index,
  audioSrc,
  heroSrc,
  minted,
  artist,
  title,
  asset_key,
  isVerified,
  isPlaying,
  currentIndex,
  setAudioState,
}: Prop1) => {
  const handlePlayPause = () => {
    if (index !== currentIndex) {
      setAudioState({
        isPlaying: true,
        currentIndex: index,
      })
      audioRef.current!.src = audioSrc
      audioRef.current?.play()
    } else {
      if (!isPlaying) {
        setAudioState((prev) => ({
          ...prev,
          isPlaying: true,
        }))
        audioRef.current?.play()
      } else {
        setAudioState((prev) => ({
          ...prev,
          isPlaying: false,
        }))
        audioRef.current?.pause()
      }
    }
  }

  return (
    <div className={classes.bgroot}>
      <Image src={heroSrc} className="h-[99%] object-cover absolute inset-0" alt="" />
      <div className="bg-shadow-gradient absolute inset-0" />
      <div className="relative">
        <div className="flex items-center gap-5 mb-6">
          <ActionIcon onClick={handlePlayPause} className={classes.play}>
            <Icon icon={isPlaying && currentIndex === index ? 'basil:pause-solid' : 'basil:play-solid'} className="text-2xl sm:text-4xl" />
          </ActionIcon>
          <div className="">
            <div className={classes.title}>{title}</div>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar size="sm" radius="xl" />
              <div className="flex items-center gap-2">
                {artist}
                {isVerified && <Icon icon="codicon:verified-filled" color="#0075FF" />}
              </div>
            </div>
            <div className="w-max text-xs py-1 px-2 bg-black/40 rounded-xl mt-2">{minted} minted</div>
          </div>
        </div>
        <Link to={`/dapp/marketplace/music?assetKey=${asset_key}`}>
          <Button size="md" className="w-28 sm:w-[150px]" bg={'#1E1E1E'}>
            Get Now
          </Button>
        </Link>
      </div>
    </div>
  )
}

const MusicPlayerCarousel = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const [appClient] = useAtom(appClientAtom)

  const getData = async (): Promise<(SoundType | ArtType)[]> => {
    const boxes = await appClient?.appClient.getBoxValues((name) => name.name.startsWith('Art') || name.name.startsWith('Sound'))
    if (boxes) {
      return parseNftBoxData(boxes)
    }
    return []
  }

  const { data, isPending, isLoading } = useQuery({
    queryKey: ['sounds'],
    queryFn: getData,
    enabled: !!appClient,
  })

  const filteredNft = data?.filter((item) => item.type === 'sound') as SoundType[]

  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentIndex: 0,
  })

  const { isPlaying } = audioState

  return (
    <div className="sm:h-[25vw] min-h-[250px] sm:min-h-[300px] sm:max-h-[500px] relative bg-[#1e1e1e]">
      {!isPending && !isLoading && (
        <>
          <audio ref={audioRef} className="hidden" />
          <Carousel
            loop={true}
            plugins={[autoplay.current]}
            onMouseEnter={!isPlaying ? autoplay.current.stop : undefined}
            onMouseLeave={!isPlaying ? autoplay.current.reset : undefined}
            withControls={false}
            withIndicators
            align={'start'}
            classNames={{ indicator: classes.indicator }}
          >
            {filteredNft?.map((item, index) => (
              <Carousel.Slide key={Number(item.data.asset_id ?? index)}>
                <CoverSection
                  index={Number(item.data.asset_id ?? index)}
                  audioSrc={item.data.audio_sample_ipfs}
                  minted={10}
                  asset_key={item.data.asset_key}
                  artist={item.data.artist}
                  heroSrc={item.data.cover_image_ipfs}
                  audioRef={audioRef}
                  title={item.data.title}
                  isVerified
                  {...audioState}
                  setAudioState={setAudioState}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </>
      )}
    </div>
  )
}

export default MusicPlayerCarousel
