declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}
import { ActionIcon, Avatar, Image, Button } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { Icon } from '@iconify/react'
import { Carousel } from '@mantine/carousel'
import '@mantine/carousel/styles.css'
import { useRef } from 'react'
import HeroHome from '../../../assets/heroHome2.jpg'
import classes from '../home.module.css'
import profile from '../../../assets/profile.jpg'

const example = 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'
const example2 = 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3'

const audioAtom = atom({
  isPlaying: false,
  index: 0,
})

type Prop1 = { audioRef: React.MutableRefObject<HTMLAudioElement | null>; index: number; mySrc: string }

const CoverSection = ({ audioRef, index, mySrc }: Prop1) => {
  const [audio, setAudio] = useAtom(audioAtom)

  const handlePlayPause = () => {
    if (index !== audio.index) {
      setAudio({
        isPlaying: true,
        index,
      })
      audioRef.current!.src = mySrc
      audioRef.current?.play()
    } else {
      if (!audio.isPlaying) {
        setAudio({
          ...audio,
          isPlaying: true,
        })
        audioRef.current?.play()
      } else {
        setAudio({
          ...audio,
          isPlaying: false,
        })
        audioRef.current?.pause()
      }
    }
  }

  return (
    <div className={classes.bgroot}>
      <Image src={HeroHome} className="h-[99%] object-cover absolute inset-0" alt="" />
      <div className="bg-shadow-gradient absolute inset-0" />
      <div className="relative">
        <div className="flex items-center gap-5 mb-6">
          <ActionIcon onClick={handlePlayPause} className={classes.play}>
            <Icon
              icon={audio.isPlaying && audio.index === index ? 'basil:pause-solid' : 'basil:play-solid'}
              className="text-2xl sm:text-4xl"
            />
          </ActionIcon>
          <div>
            <div className={classes.title}>Beat the Flow</div>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar src={profile} size="sm" radius="xl" />
              <div className="flex items-center gap-2">
                Tyler Faye
                <Icon icon="codicon:verified-filled" color="#0075FF" />
              </div>
              <div className="text-xs py-1 px-2 bg-black/40 rounded-xl">38% minted</div>
            </div>
          </div>
        </div>
        <Button size="md" w={150} bg={'#1E1E1E'}>
          Stream Now
        </Button>
      </div>
    </div>
  )
}

const MusicPlayerCarousel = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // const autoplay = useRef(Autoplay({ delay: 2000 }))
  // const isPlaying = useAtomValue(isPlayingAtom)

  return (
    <>
      <audio src={example} ref={audioRef} className="hidden" />
      <Carousel
        loop={true}
        // // plugins={!isPlaying ? [autoplay.current] : undefined}
        // // onMouseEnter={!isPlaying ? autoplay.current.stop : undefined}
        // // onMouseLeave={!isPlaying ? autoplay.current.reset : undefined}
        withControls={false}
        withIndicators
        align={'start'}
        classNames={{ indicator: classes.indicator }}
      >
        <Carousel.Slide>
          <CoverSection index={0} mySrc={example} audioRef={audioRef} />
        </Carousel.Slide>
        <Carousel.Slide>
          <CoverSection index={1} mySrc={example2} audioRef={audioRef} />
        </Carousel.Slide>
        <Carousel.Slide>
          <CoverSection index={2} mySrc={example} audioRef={audioRef} />
        </Carousel.Slide>
      </Carousel>
    </>
  )
}

export default MusicPlayerCarousel
