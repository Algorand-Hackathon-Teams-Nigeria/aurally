import { Avatar, Button } from '@mantine/core'
import { useWallet } from '@txnlab/use-wallet'
import { useNavigate } from 'react-router-dom'
import profile from '../../assets/profile.jpg'
import CopyButton from '../../components/General/CopyButton'
import MusicCard from '../../components/MusicCard'
import { ellipseAddress } from '../../utils/ellipseAddress'
import { useState } from 'react'
import classes from '../MusicDetails/musicdetail.module.css'
import noActiviy from '../../assets/no-activity.svg'

const ProfileTab = () => {
  const [type, setType] = useState(0)
  const bg = (num: number) => (type === num ? '#1e1e1e' : 'transparent')
  const navigate = useNavigate()
  const stream = () => {
    navigate('/marketplace/music/12')
  }

  return (
    <div className="gboard-no-bg mt-6 mb-[90px] min-h-[434px]">
      <div className="flex overflow-x-scroll remove-scroll pb-0.5">
        <Button size="lg" onClick={() => setType(0)} classNames={{ root: classes.greyButton }} bg={bg(0)}>
          Created
        </Button>
        <Button size="lg" onClick={() => setType(1)} classNames={{ root: classes.greyButton }} bg={bg(1)}>
          Activity
        </Button>
      </div>
      {type === 0 ? (
        <div className="w-full grid grid-cols-music-card gap-5">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <MusicCard
              action={stream}
              title="Beat the flow"
              title2="$50"
              desc="This event is to help new artist grow their fanbase and promote their music."
              key={item}
              buttonLabel="View Details"
            />
          ))}
        </div>
      ) : (
        <div className="w-full min-h-[234px] flex flex-col justify-center items-center gap-5">
          <img src={noActiviy} width={49} alt="" />
          <div className="w-full text-center text-xl">You don’t have any activity</div>
        </div>
      )}
    </div>
  )
}

const Profile = () => {
  const { activeAddress } = useWallet()

  return (
    <div className="routePage mb-32">
      <div className="routeName">Profile</div>
      <Avatar size={150} className="mt-12" src={profile} />
      <div className="text-3xl sm:text-[45px] font-bold sm:leading-[52px] mt-6">John Doe</div>
      <div className="flex flex-wrap items-center sm:text-[22px] mt-3">
        <div className="pr-4">@username</div>
        {activeAddress && (
          <div className="flex items-center gap-4 border-l pl-4 border-[#444]">
            <span>{ellipseAddress(activeAddress)}</span>
            <CopyButton text={activeAddress} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-5 mt-8">
        <div className="gcard-with-bg">
          <div>Minted</div>
          <div>0</div>
        </div>
        <div className="gcard-with-bg">
          <div>Created</div>
          <div>0</div>
        </div>
      </div>
      <div className="mb-10 mt-20">
        <ProfileTab />
      </div>
    </div>
  )
}

export default Profile