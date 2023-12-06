import { Button, Tabs } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import AudioPlayer from '../../components/AudioPlayer'
import { modals } from '@mantine/modals'
import { useAtomValue } from 'jotai'
import { myArtAtom, myStreamAtom } from '../../store/atoms'
import tabClass from '../../styles/tab.module.css'
import NftCard from '../../components/Cards/NftCard'

const TYPES = ['Streams', 'Arts']

const MyNfts = () => {
  const wavesurferRef = useRef<WaveSurfer | null>(null)
  const soundList = useAtomValue(myStreamAtom)
  const artList = useAtomValue(myArtAtom)

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
      <Tabs keepMounted={false} classNames={{ tab: tabClass.tab, list: tabClass.list, panel: tabClass.panel }} defaultValue={TYPES[0]}>
        <Tabs.List className="mb-14">
          {TYPES.map((item) => (
            <Tabs.Tab value={item} key={item}>
              {item}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value={TYPES[0]}>
          <div className="routeName">Beat the flow</div>
          <div className="mt-4 mb-16">
            <AudioPlayer wavesurferRef={wavesurferRef} />
          </div>
          {soundList.length > 0 ? (
            <div className="grid grid-cols-music-card gap-4 sm:gap-5">
              {soundList.map((item) => (
                <NftCard key={item.id} data={item} buttonLabel="Play" buttonAction={() => {}} />
              ))}
            </div>
          ) : (
            <>
              <div>You don't have any Stream in your wallet. Check out the marketplace for available sales.</div>
              <Link to="/dapp/marketplace">
                <Button className="mt-8" size="md" px={40}>
                  Go to Marketplace
                </Button>
              </Link>
            </>
          )}
        </Tabs.Panel>
        <Tabs.Panel value={TYPES[1]}>
          {artList.length > 0 ? (
            <div className="grid grid-cols-music-card gap-4 sm:gap-5">
              {artList.map((item) => (
                <NftCard key={item.id} data={item} buttonLabel="View Details" />
              ))}
            </div>
          ) : (
            <>
              <div>You don't have any Art in your wallet. Check out the marketplace for available sales.</div>
              <Link to="/dapp/marketplace">
                <Button className="mt-8" size="md" px={40}>
                  Go to Marketplace
                </Button>
              </Link>
            </>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default MyNfts
