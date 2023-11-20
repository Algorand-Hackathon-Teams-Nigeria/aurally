import MusicCard from '../../components/MusicCard'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import AudioPlayer from '../../components/AudioPlayer'
import { modals } from '@mantine/modals'
import { useAtomValue } from 'jotai'
import { myStreamAtom } from '../../store/atoms'

const MyStreams = () => {
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const nftList = useAtomValue(myStreamAtom)

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.on('finish', () => {
        modals.openContextModal({
          modal: 'message',
          innerProps: {
            title: 'You have Earned 20 AURA',
            icon: 'gift',
            desc: '',
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
      {nftList.length > 0 ? (
        <div className="mb-10">
          <div className="routeName mb-6">My Streams</div>
          <div className="grid grid-cols-music-card gap-4 sm:gap-5">
            {nftList.map((item) => (
              <MusicCard
                img={item.imgUrl}
                title={item.title}
                title2="Bid"
                title3={item.artist}
                title4={`${Number(item.price)} ALGO`}
                key={item.id}
                buttonLabel="Play"
                // link={`/dapp/marketplace/music/${item.id}`}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div>You don't have any assets in your wallet. Check out the marketplace for available sales.</div>
          <Link to="/dapp/marketplace">
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
