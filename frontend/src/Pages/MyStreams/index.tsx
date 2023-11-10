import { Carousel } from '@mantine/carousel'
import MusicCard from '../../components/MusicCard'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import AudioPlayer from '../../components/AudioPlayer'
import { modals } from '@mantine/modals'

const assetList = [1]

const WithAsset = () => {
  return (
    <div className="mb-10">
      <div className="routeName mb-6">My Streams</div>
      <div className="grid grid-cols-music-card gap-4 sm:gap-5">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <MusicCard
            action={() => {}}
            title="Beat the flow"
            title2="Bid"
            title3="Tyler Faye"
            title4="0.25 ETH"
            key={item}
            buttonLabel="Sell Now"
          />
        ))}
      </div>
    </div>
  )
}

const MyStreams = () => {
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.on('finish', () => {
        modals.openContextModal({
          modal: 'message',
          innerProps: {
            title: 'Upload Successful',
            icon: 'gift',
            desc: 'Your Music has been uploaded successfully',
            btnLabel: 'View activity',
          },
        })
      })
    }
  }, [])

  return (
    <div className="routePage pb-32">
      <div className="routeName mb-12">Now Playing</div>
      <div className="mb-20">
        <div className="mb-2 text-xl">Beat the flow</div>
        <AudioPlayer wavesurferRef={wavesurferRef} />
      </div>
      {assetList.length > 0 ? (
        <WithAsset />
      ) : (
        <>
          <div>You don't have any assets in your wallet. Check out the marketplace for available sales.</div>
          <Link to="/marketplace">
            <Button className="mt-8" size="md" px={40}>
              Go to Marketplace
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

export default MyStreams
