import { useNavigate } from 'react-router-dom'
import TitleHeader from '../../components/General/TitleHeader'
import MusicCard from '../../components/MusicCard'

const MarketPlace = () => {
  const navigate = useNavigate()

  const joinAction = () => {
    navigate('music/12')
  }

  return (
    <div className="space-y-8 mb-32 routePage">
      <div>
        <TitleHeader title="Recently added" />
        <div className="grid grid-cols-music-card gap-3">
          {[1, 2, 3, 4].map((item) => (
            <MusicCard
              action={joinAction}
              title="Beat the flow"
              title2="Bid"
              title3="Tyler Faye"
              title4="0.25 ETH"
              key={item}
              buttonLabel="Stream Now"
            />
          ))}
        </div>
      </div>
      <div>
        <TitleHeader title="Popular Picks" />
        <div className="grid grid-cols-music-card gap-3">
          {[1, 2, 3, 4].map((item) => (
            <MusicCard
              action={joinAction}
              title="Beat the flow"
              title2="Bid"
              title3="Tyler Faye"
              title4="0.25 ETH"
              key={item}
              buttonLabel="Stream Now"
            />
          ))}
        </div>
      </div>
      <div>
        <TitleHeader title="Recommended Picks" />
        <div className="grid grid-cols-music-card gap-3">
          {[1, 2, 3, 4].map((item) => (
            <MusicCard
              action={joinAction}
              title="Beat the flow"
              title2="Bid"
              title3="Tyler Faye"
              title4="0.25 ETH"
              key={item}
              buttonLabel="Stream Now"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MarketPlace
