import { Avatar } from '@mantine/core'
import { useWallet } from '@txnlab/use-wallet'
import { useNavigate } from 'react-router-dom'
import profile from '../../assets/profile.jpg'
import CopyButton from '../../components/General/CopyButton'
import MusicCard from '../../components/MusicCard'
import { ellipseAddress } from '../../utils/ellipseAddress'

const Profile = () => {
  const { activeAddress } = useWallet()
  const navigate = useNavigate()
  const stream = () => {
    navigate('/marketplace/music/12')
  }
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
      <div className="mb-10 mt-20">
        <div className="headTag">Uploads</div>
        <div className="grid grid-cols-music-card gap-5">
          {[1, 2, 3, 4].map((item) => (
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
      </div>
      <div className="mb-10 mt-20">
        <div className="headTag">Activity</div>
      </div>
    </div>
  )
}

export default Profile
