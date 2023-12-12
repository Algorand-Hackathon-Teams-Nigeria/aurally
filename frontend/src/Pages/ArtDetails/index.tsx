import { Button, Image } from '@mantine/core'
import React, { useState } from 'react'
import classes from '../MusicDetails/musicdetail.module.css'
import Stat1 from '../../components/General/Stat1'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { ArtNft } from '../../contracts/Aurally'
import { appClientAtom } from '../../store/contractAtom'
import { ArtNFTTupple, BoxKeyData, artNFTDecoder, parseBoxKey } from '../../utils/encoding'
import { getUserFromAddressSlice } from '../../utils/queries'
import { UserAccount } from '../../types/account'
import { ellipseAddress } from '../../utils/ellipseAddress'

const activity = Array.from({ length: 2 }, (_, i) => ({
  id: i,
  from: '0x1153...8dc01',
  to: ' 0x11534...8dc01',
  price: 0.5,
  type: 'transferred',
  date: '3 months ago',
}))

const ArtDetails = () => {
  const [searchParams] = useSearchParams()
  const [type, setType] = useState(0)
  const [nft, setNft] = useState<ArtNft>()
  const [keyData, setKeyData] = useState<BoxKeyData>()
  const [creator, setCreator] = useState<UserAccount>()
  const [appClient,] = useAtom(appClientAtom)


  const bg = (num: number) => (type === num ? '#444' : 'transparent')

  const artId = searchParams.get("assetKey")
  async function getArt() {
    const res = await appClient?.appClient.getBoxValue(artId ?? "")
    if (res) {
      const val = artNFTDecoder.decode(res)
      const artVal = ArtNft(val as ArtNFTTupple)
      setNft(artVal)

      if (appClient) {
        const user = await getUserFromAddressSlice(artVal.owner, appClient)
        setCreator(user)
      }
    }

    const keyVal = parseBoxKey(artId ?? "")
    if (keyVal.type == "Art") setKeyData(keyVal)
  }

  React.useEffect(() => {
    getArt()
  }, [])

  return (
    <div className="routePage">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="h-[75vw] lg:h-[35vw] max-h-[500px] rounded-[10px] overflow-hidden">
          <Image src={nft?.ipfs_location} className="h-full object-top object-cover" />
        </div>
        <div className="flex flex-col justify-end">
          <div className="py-5 lg:py-8 px-4 lg:px-6 border border-[#444444]">
            <div className="text-[#919191]">Price</div>
            <div className="p-4 sm:p-6 rounded-[10px] bg-[#1E1E1E] mb-6 mt-1">{Number(nft?.price)} ALGO</div>
            <Button size="md" fullWidth>
              Collect
            </Button>
          </div>
        </div>
      </div>
      <h1 className="detailsTitle mt-8 mb-3">{nft?.title}</h1>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="sm:text-[22px] font-bold text-white">@{creator?.data.username.toLowerCase()}</span>
          <Icon icon="codicon:verified-filled" width={20} color="#0075FF" />
        </div>
        <div className="font-bold text-xs sm:text-sm text-[#afafaf]">creator</div>
      </div>
      <div className="gboard mt-6 mb-[90px] min-h-[434px]">
        <div className="flex overflow-x-auto pb-0.5">
          <Button size="lg" onClick={() => setType(0)} classNames={{ root: classes.greyButton }} bg={bg(0)}>
            Overview
          </Button>
          <Button size="lg" onClick={() => setType(1)} classNames={{ root: classes.greyButton }} bg={bg(1)}>
            Analytics
          </Button>
        </div>
        {type === 0 ? (
          <div>
            <div className="pt-4 pb-8">{nft?.description}</div>
            <div className="flex flex-wrap gap-5 sm:gap-20">
              <Stat1 title="GENRES" title2="RnB" />
              <Stat1 title="Date Created" title2={new Date(keyData?.dateCreated ?? "").toDateString()} />
              <Stat1 title="Total Voume" title2={`${nft?.supply}`} />
              <Stat1 title="Current Owner" title2={ellipseAddress(creator?.address)} />
            </div>
          </div>
        ) : activity.length > 0 ? (
          <div className="w-full space-y-6 mt-6">
            {activity.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b sm:border border-borderColor sm:rounded-xl pb-3 sm:p-4">
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={nft?.ipfs_location} className="object-top object-cover h-full" />
                </div>
                <div className="text-[11px] sm:text-xs space-y-1">
                  <div className="font-bold text-sm sm:text-base">{nft?.title}</div>
                  <div>
                    <span className="text-[#afafaf] mr-[0.25em]">Tranferred from</span> {item.from}{' '}
                    <span className="text-[#afafaf] mx-[0.25em]">to</span> {item.to}
                  </div>
                  <div>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full text-center mt-24">No Activity</div>
        )}
      </div>
    </div>
  )
}

export default ArtDetails
