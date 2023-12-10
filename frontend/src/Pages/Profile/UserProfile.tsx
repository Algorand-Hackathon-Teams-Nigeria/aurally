import { Avatar, Tabs } from '@mantine/core'
import profile from '../../assets/profile.jpg'
import CopyButton from '../../components/General/CopyButton'
import { useAtom, useAtomValue } from 'jotai'
import { ellipseAddress } from '../../utils/ellipseAddress'
import { createdNftsAtom } from '../../store/atoms'
import noActiviy from '../../assets/no-activity.svg'
import tabClass from '../../styles/tab.module.css'
import NftCard from '../../components/Cards/NftCard'
import { AurallyCreative } from '../../contracts/Aurally'
import { useWallet } from '@txnlab/use-wallet'
import { appClientAtom, appRefAtom, aurallyCreativeAtom } from '../../store/contractAtom'
import React from 'react'
import algosdk from 'algosdk'
import { toast } from 'react-hot-toast'


const TYPES = ['Created', 'Purchased', 'Sold', 'Minted', 'Activity']

const ProfileTab = () => {
  const nftList = useAtomValue(createdNftsAtom)
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
              {nftList.map((item) => (
                <NftCard data={item} key={item.id} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[1]}>
            <div className="w-full grid grid-cols-music-card gap-5">
              {nftList.map((item) => (
                <NftCard data={item} key={item.id} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[2]}>
            <div className="w-full grid grid-cols-music-card gap-5">
              {nftList.map((item) => (
                <NftCard data={item} key={item.id} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[3]}>
            <div className="w-full grid grid-cols-music-card gap-5">
              {nftList.map((item) => (
                <NftCard data={item} key={item.id} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value={TYPES[4]}>
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

interface UserProfileProps {
  creative: AurallyCreative
}

export default function UserProfile(props: UserProfileProps) {
  const { activeAddress } = useWallet();
  const [, setCreative] = useAtom(aurallyCreativeAtom);
  const [appClient] = useAtom(appClientAtom);
  const [appRef] = useAtom(appRefAtom);
  const { creative } = props;

  async function getUpdatedData() {
    if (activeAddress) {
      try {
        const res = await appClient?.getRegisteredCreative({ addr: activeAddress },
          {
            boxes: [
              { appId: appRef?.appId ?? 0, name: algosdk.decodeAddress(activeAddress).publicKey }
            ]
          }
        )
        setCreative(res?.return)
      } catch (err) {
        toast.error(JSON.stringify(err))
      }
    }
  }

  React.useEffect(() => {
  }, [])

  return (
    <div className="routePage mb-32">
      <div className="routeName">Profile</div>
      <Avatar size={150} className="mt-12" src={profile} />
      <div className="text-3xl sm:text-[45px] font-bold sm:leading-[52px] mt-6">{creative.fullname}</div>
      <div className="flex flex-wrap items-center sm:text-[22px] mt-3">
        <div className="pr-4">@{creative.username.toLowerCase()}</div>
        {activeAddress && (
          <div className="flex items-center gap-4 border-l pl-4 border-[#444]">
            <span>{ellipseAddress(activeAddress)}</span>
            <CopyButton text={activeAddress} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-profile-card-sm sm:grid-cols-profile-card gap-4 sm:gap-5 mt-8">
        <div className="gcard-with-bg">
          <div>Minted</div>
          <div>{Number(creative.minted)}</div>
        </div>
        <div className="gcard-with-bg">
          <div>Created</div>
          <div>0</div>
        </div>
        <div className="gcard-with-bg">
          <div>Sold</div>
          <div>0</div>
        </div>
        <div className="gcard-with-bg">
          <div>Purchased</div>
          <div>0</div>
        </div>
      </div>
      <div className="mb-10 mt-20">
        <ProfileTab />
      </div>
    </div>
  )
}
