import { Button, Image } from '@mantine/core'
import React, { useState } from 'react'
import classes from '../MusicDetails/musicdetail.module.css'
import Stat1 from '../../components/General/Stat1'
import { Icon } from '@iconify/react'
import { useSearchParams } from 'react-router-dom'
import { useAtom } from 'jotai'
import { ArtNft } from '../../contracts/Aurally'
import { appRefAtom, auraTokenAtom } from '../../store/contractAtom'
import { ArtNFTTupple, BoxKeyData, artNFTDecoder, encodeText, parseBoxKey } from '../../utils/encoding'
import { getUserFromAddressSlice } from '../../utils/queries'
import { UserAccount } from '../../types/account'
import { ellipseAddress } from '../../utils/ellipseAddress'
import algosdk, { microalgosToAlgos } from 'algosdk'
import { useWallet } from '@txnlab/use-wallet'
import { createAppClient, getAlgodClient } from '../../utils/network/contract-config'
import { toast } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'

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
  const [appRef] = useAtom(appRefAtom)
  const [auraToken] = useAtom(auraTokenAtom)
  const [purchasing, setPurchasing] = React.useState(false)
  const { activeAddress, signer } = useWallet()

  const bg = (num: number) => (type === num ? '#444' : 'transparent')

  const artId = searchParams.get('assetKey')

  const getData = async (): Promise<{
    nft: ArtNft | undefined
    creator: UserAccount | undefined
    keyData: BoxKeyData | undefined
  }> => {
    if (!artId) {
      return {
        nft: undefined,
        creator: undefined,
        keyData: undefined,
      }
    }
    const appClient = createAppClient()
    const res = await appClient?.appClient.getBoxValue(artId ?? '')
    const val = artNFTDecoder.decode(res)
    const nft = ArtNft(val as ArtNFTTupple)
    const creator = await getUserFromAddressSlice(nft.owner, appClient)
    const keyVal = parseBoxKey(artId ?? '') as BoxKeyData
    return {
      nft,
      creator,
      keyData: keyVal.type == 'Art' ? keyVal : undefined,
    }
  }

  const { data } = useQuery({
    queryKey: ['art-nft', artId],
    queryFn: getData,
    initialData: {
      nft: undefined,
      creator: undefined,
      keyData: undefined,
    },
  })

  const { nft, creator, keyData } = data

  async function purchaseNft() {
    if (!activeAddress) {
      toast.error('Please connect your wallet')
      return
    }
    setPurchasing(true)
    const sp = await getAlgodClient().getTransactionParams().do()
    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: activeAddress ?? '',
      to: appRef?.appAddress ?? '',
      amount: nft?.price ?? 0,
      suggestedParams: sp,
    })
    const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: activeAddress ?? '',
      to: activeAddress ?? '',
      amount: 0,
      suggestedParams: sp,
      assetIndex: Number(nft?.asset_id ?? 0),
    })
    const auraOptIntTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      from: activeAddress ?? '',
      to: activeAddress ?? '',
      amount: 0,
      suggestedParams: sp,
      assetIndex: Number(auraToken?.asset_id ?? 0),
    })
    try {
      await createAppClient({ signer, addr: activeAddress })?.purchaseNft(
        {
          txn,
          optin_txn: optInTxn,
          aura_optin_txn: auraOptIntTxn,
          asset_key: nft?.asset_key ?? '',
          buyer: activeAddress ?? '',
          seller: nft?.owner ?? '',
          nft_id: nft?.asset_id ?? 0,
          aura_id: auraToken?.asset_id ?? 0,
          nft_type: 'art',
        },
        {
          boxes: [
            { appId: appRef?.appId ?? 0, name: encodeText('aura') },
            { appId: appRef?.appId ?? 0, name: encodeText(nft?.asset_key ?? '') },
          ],
        },
      )
      toast.success(`Success: You've just pruchased a copy of ${nft?.name}`)
      setPurchasing(false)
    } catch (err) {
      setPurchasing(false)
      toast.error(JSON.stringify(err))
    }
  }

  return (
    <div className="routePage">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
        <div className="h-[75vw] lg:h-[35vw] max-h-[500px] rounded-[10px] overflow-hidden">
          <Image src={nft?.ipfs_location} className="h-full object-top object-cover" />
        </div>
        <div className="flex flex-col justify-end">
          <div className="py-5 lg:py-8 px-4 lg:px-6 border border-[#444444]">
            <div className="text-[#919191]">Price</div>
            <div className="p-4 sm:p-6 rounded-[10px] bg-[#1E1E1E] mb-6 mt-1">{microalgosToAlgos(Number(nft?.price ?? 0))} ALGO</div>
            <Button loading={purchasing} disabled={purchasing} onClick={purchaseNft} size="md" fullWidth>
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
              <Stat1 title="Date Created" title2={new Date(keyData?.dateCreated ?? '').toDateString()} />
              <Stat1 title="Total Volume" title2={`${nft?.supply || 0}`} />
              <Stat1 title="Current Owner" title2={ellipseAddress(creator?.address) || '...'} />
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
