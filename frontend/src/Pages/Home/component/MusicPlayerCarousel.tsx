declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
import { ActionIcon, Avatar, Image, Button } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { Icon } from '@iconify/react'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { useRef, useState } from 'react'
import classes from '../home.module.css'
import { soundListAtom } from '../../../store/atoms'
import { Link } from 'react-router-dom'
import Autoplay from 'embla-carousel-autoplay'

type Prop1 = {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  index: number
  audioSrc: string
  heroSrc: string
  avatarSrc: string
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
  avatarSrc,
  minted,
  artist,
  title,
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
              <Avatar src={avatarSrc} size="sm" radius="xl" />
              <div className="flex items-center gap-2">
                {artist}
                {isVerified && <Icon icon="codicon:verified-filled" color="#0075FF" />}
              </div>
            </div>
            <div className="w-max text-xs py-1 px-2 bg-black/40 rounded-xl mt-2">{minted} minted</div>
          </div>
        </div>
        <Link to="/dapp/marketplace/music/3">
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
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    currentIndex: 0,
  })

  const { isPlaying } = audioState
  const soundList = useAtomValue(soundListAtom)

  return (
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
        {soundList.map((item) => (
          <Carousel.Slide key={item.id}>
            <CoverSection
              index={item.id}
              audioSrc={item.audio}
              minted={10}
              artist={item.artist}
              heroSrc={item.imgUrl}
              avatarSrc={item.imgUrl}
              audioRef={audioRef}
              title={item.title}
              isVerified
              {...audioState}
              setAudioState={setAudioState}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  )
}

export default MusicPlayerCarousel
