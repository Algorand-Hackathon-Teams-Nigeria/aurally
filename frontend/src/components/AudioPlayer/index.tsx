import { useEffect, useRef } from 'react'
import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js'
import classes from './audioplayer.module.css'
import { Icon } from '@iconify/react'
import { ActionIcon } from '@mantine/core'
import { atom, useAtomValue, useSetAtom } from 'jotai'

const example = 'https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3'

const forwardOption = (ref: HTMLDivElement | null) => ({
  container: ref || '#waveform',
  waveColor: '#919191',
  progressColor: '#8A2BE2',
  // Set a bar width
  barWidth: 3,
  // Optionally, specify the spacing between bars
  barGap: 2,
  cursorWidth: 0,
  // And the bar radius
  barRadius: 3,
  autoplay: false,
  responsive: true,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: true,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: true,
  // auto height
  height: 'auto',
})

// Extract state to cause only the button and currentTime to re-render
const currentAtom = atom(0)
const isPlayingAtom = atom(false)

const CurrentTime = () => {
  const rawTime = useAtomValue(currentAtom)
  const time = formatTime(rawTime)
  return <div className="min-w-[42px] sm:min-w-[52px] text-[13px] sm:text-base">{time}</div>
}

const PlayButton = ({ onClick }: { onClick: () => void }) => {
  const isPlaying = useAtomValue(isPlayingAtom)
  return (
    <ActionIcon onClick={onClick} className={classes.play}>
      <Icon icon={isPlaying ? 'basil:pause-solid' : 'basil:play-solid'} width={24} />
    </ActionIcon>
  )
}

const AudioPlayer = ({
  audioUrl = example,
  wavesurferRef,
}: {
  audioUrl?: string
  wavesurferRef: React.MutableRefObject<WaveSurfer | null>
}) => {
  const waveContainerRef = useRef<HTMLDivElement | null>(null)
  // const wavesurferRef = useRef<WaveSurfer | null>(null)
  const setIsPlaying = useSetAtom(isPlayingAtom)
  const setCurrentTime = useSetAtom(currentAtom)

  useEffect(() => {
    setIsPlaying(false)
    const options = forwardOption(waveContainerRef.current) as WaveSurferOptions

    wavesurferRef.current = WaveSurfer.create(options)

    wavesurferRef.current?.load(audioUrl)

    wavesurferRef.current?.on('timeupdate', (currentTime) => {
      if (wavesurferRef.current) {
        setCurrentTime(currentTime)
      }
    })

    wavesurferRef.current?.on('pause', () => {
      setIsPlaying(false)
    })

    wavesurferRef.current?.on('play', () => {
      setIsPlaying(true)
    })

    return () => {
      wavesurferRef.current?.destroy()
    }
  }, [audioUrl])

  const handlePlayPause = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current?.playPause()
    }
  }

  return (
    <div className={classes.root}>
      <PlayButton onClick={handlePlayPause} />
      <CurrentTime />
      <div className={classes.innerroot}>
        <div id="waveform" ref={waveContainerRef} className="min-h-full flex-1" />
      </div>
      <div className="hidden sm:inline-block">00:30</div>
      <ActionIcon className={classes.otherIcon}>
        <Icon icon="icon-park-outline:like" width={24} />
      </ActionIcon>
      <ActionIcon className={classes.otherIcon}>
        <Icon icon="solar:download-outline" width={24} />
      </ActionIcon>
    </div>
  )
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(remainingSeconds).padStart(2, '0')

  return `${paddedMinutes}:${paddedSeconds}`
}

export default AudioPlayer
