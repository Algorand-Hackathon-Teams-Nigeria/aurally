import { Tabs } from '@mantine/core'
import noActiviy from '../../assets/no-activity.svg'
import tabClass from '../../styles/tab.module.css'
import NftCard from '../../components/Cards/NftCard'
import { useEffect, useState } from 'react'
import { filterByKeyCreator } from '../../utils/encoding'
import { useWallet } from '@txnlab/use-wallet'
import { ArtType, SoundType } from '../../types/assets'
import { parseNftBoxData } from '../../utils/parsing'
import { createAppClient } from '../../utils/network/contract-config'

const TYPES = ['Created', 'Purchased', 'Sold', 'Activity']

export default function ProfileTab() {
  const [nfts, setNfts] = useState<(SoundType | ArtType)[]>([])
  const { activeAddress } = useWallet()

  const getNames = async () => {
    const boxes = await createAppClient()?.appClient.getBoxValues(
      (name) => filterByKeyCreator(name.name, activeAddress ?? '') && (name.name.startsWith('Art') || name.name.startsWith('Sound')),
    )
    // console.log(boxes)

    if (boxes) {
      const nftData = parseNftBoxData(boxes)
      setNfts(nftData)
    }
  }

  useEffect(() => {
    if (activeAddress) {
      getNames()
    }
  }, [activeAddress])

  return (
    <div className="gboard bg-[#1e1e1e] mt-6 mb-[90px]">
      <div className="w-full">
        <Tabs classNames={{ tab: tabClass.tab, list: tabClass.list, panel: tabClass.panel }} defaultValue={TYPES[0]}>
          <Tabs.List className="mb-8">
            {TYPES.map((item) => (
              <Tabs.Tab value={item} key={item}>
                {item}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value={TYPES[0]}>
            <div className="w-full grid grid-cols-music-card gap-5">
              {nfts.map((item) => (
                <NftCard buttonLabel="view details" data={item} key={Number(item.data.asset_id)} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[1]}>
            <div className="w-full grid grid-cols-music-card gap-5">
              {[].map((item, id) => (
                <NftCard data={item} key={id} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[2]}>
            <div className="w-full grid grid-cols-music-card gap-5">
              {[].map((item, id) => (
                <NftCard data={item} key={id} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[3]}>
            <div className="min-h-[305px] flex flex-col items-center justify-center gap-5">
              <img src={noActiviy} width={49} alt="" />
              <div className="w-full text-center text-xl">You don’t have any activity</div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}
