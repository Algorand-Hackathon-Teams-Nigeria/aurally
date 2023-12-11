import { ActionIcon, Avatar, Button, Image } from '@mantine/core'
import { Icon } from '@iconify/react'
import AudioPlayer from '../../components/AudioPlayer'
import classes from './musicdetail.module.css'
import profile from '../../assets/profile.jpg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'
import { modals } from '@mantine/modals'
import Stat1 from '../../components/General/Stat1'
import { useAtom } from 'jotai'
import { SoundNft } from '../../contracts/Aurally'
import { AssetKeyData, SoundNFTTupple, parseAssetKey, soundNFTDecoder } from '../../utils/encoding'
import { UserAccount } from '../../types/account'
import { appClientAtom } from '../../store/contractAtom'
import { getUserFromAddressSlice } from '../../utils/queries'


const MusicDetails = () => {
  const [searchParams] = useSearchParams()
  const [nft, setNft] = useState<SoundNft>()
  const [keyData, setKeyData] = useState<AssetKeyData>()
  const [creator, setCreator] = useState<UserAccount>()
  const [appClient,] = useAtom(appClientAtom)
  const [type, setType] = useState(0)
  const bg = (num: number) => (type === num ? '#444' : 'transparent')

  const musicId = searchParams.get("assetKey")

  async function getSound() {
    const res = await appClient?.appClient.getBoxValue(musicId ?? "")
    if (res) {
      const val = soundNFTDecoder.decode(res)
      const soundVal = SoundNft(val as SoundNFTTupple)
      setNft(soundVal)

      if (appClient) {
        const user = await getUserFromAddressSlice(soundVal.owner, appClient)
        setCreator(user)
      }
    }

    const keyVal = parseAssetKey(musicId ?? "")
    if (keyVal.type == "Sound") setKeyData(keyVal)
  }

  React.useEffect(() => {
    getSound()
  }, [])

  const navigate = useNavigate()
  const wavesurferRef = useRef<WaveSurfer | null>(null)

  const goBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0 })
    }
  }, [])

  const openBuyModal = () => {
    if (wavesurferRef.current?.isPlaying()) {
      wavesurferRef.current?.playPause()
    }
    modals.openContextModal({
      modal: 'buy',
      innerProps: {
        id: nft?.asset_key,
        title: nft?.title,
        artist: nft?.artist,
        streams: nft?.supply,
        price: nft?.price,
        relase_date: '4 Nov, 2023',
      },
    })
  }

  return (
    <div className="relative routePage">
      <div className={classes.aspectRatio}>
        <Image src={nft?.cover_image_ipfs} className="w-full h-[99%] object-cover" alt="" />
        <div className="bg-shadow-gradient2 absolute inset-0" />
      </div>
      <div className="flex justify-between">
        <ActionIcon onClick={goBack} classNames={{ root: classes.arrowBack }}>
          <Icon icon="typcn:arrow-back-outline" width={24} />
        </ActionIcon>
        <div className="md:hidden">
          <ActionIcon classNames={{ root: classes.arrowBack }}>
            <Icon icon="icon-park-outline:like" width={20} />
          </ActionIcon>
        </div>
      </div>
      <div className="relative pt-28">
        <h1 className="detailsTitle">{nft?.title}</h1>
        <div className={classes.details}>
          <div className="flex gap-5 items-center">
            <Avatar src={profile} size="lg" radius="md" classNames={{ image: 'border-2 sm:border-[3px] rounded-lg' }} />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="sm:text-[22px] font-bold text-white">{nft?.label}</span>
                <Icon icon="codicon:verified-filled" width={20} color="#0075FF" />
              </div>
              <div className="font-bold text-xs sm:text-sm text-[#afafaf]">{nft?.artist}</div>
            </div>
          </div>
          <div className="flex items-end gap-4 sm:gap-6 self-start">
            <Stat1 title="Price" title2={`${nft?.price} ALGO`} />
            <Stat1 title="Streams" title2={nft?.supply.toString() ?? ""} />
            <Button onClick={openBuyModal} classNames={{ root: classes.btnGet }} size="xl">
              Get Now
            </Button>
          </div>
        </div>
        <div className="font-bold text-sm text-[#afafaf] mb-1 mt-3.5">Preview</div>
        <AudioPlayer audioUrl={nft?.full_track_ipfs} wavesurferRef={wavesurferRef} />
        <div className="gboard mt-6 mb-[90px] min-h-[434px]">
          <div className="flex overflow-x-auto  pb-0.5">
            <Button size="lg" onClick={() => setType(0)} classNames={{ root: classes.greyButton }} bg={bg(0)}>
              Overview
            </Button>
            <Button size="lg" onClick={() => setType(1)} classNames={{ root: classes.greyButton }} bg={bg(1)}>
              Analytics
            </Button>
          </div>
          {type === 0 ? (
            <>
              <div className="flex flex-wrap gap-5 sm:gap-20">
                <Stat1 title="GENRES" title2="RnB" />
                <Stat1 title="Date Created" title2={`${new Date(keyData?.dateCreated ?? "").toDateString()}`} />
                <Stat1 title="Total Voume" title2={`${Number(nft?.supply)}`} />
              </div>
            </>
          ) : (
            <div className="w-full text-center mt-24">No Activity</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MusicDetails
