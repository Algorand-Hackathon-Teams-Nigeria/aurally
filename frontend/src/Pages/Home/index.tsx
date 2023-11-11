import { Button } from '@mantine/core'
import { atom, useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import MusicCard from '../../components/MusicCard'
import MusicPlayerCarousel from './component/MusicPlayerCarousel'

const musicTypeAtom = atom('On Sale')
const TYPES = ['On Sale', 'Top', 'Recently Added']

const MusicType = () => {
  const [type, setType] = useAtom(musicTypeAtom)

  return (
    <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-scroll remove-scroll">
      {TYPES.map((item) => (
        <Button onClick={() => setType(item)} key={item} variant={item === type ? 'filled' : 'outline'} radius="xl">
          {item}
        </Button>
      ))}
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const joinAction = () => {
    navigate('/marketplace/music/12')
  }
  return (
    <div>
      <MusicPlayerCarousel />
      <section className="routePage mb-32">
        <div className="text-[2rem] font-bold mb-6 mt-6">Trending Auras</div>
        <MusicType />
        <div className="w-full grid grid-cols-music-card gap-[18px]">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <MusicCard
              action={joinAction}
              title="Beat the flow"
              title2="Bid"
              title3="Tyler Faye"
              title4="0.25 ALGO"
              key={item}
              buttonLabel="Buy and Stream Now"
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

{
  /* <section className={classes.widget}>
          <div>
            <TitleHeader title="Top Streams" />
            <div className="grid gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <SummaryBox to="/marketplace/music/12" key={item} />
              ))}
            </div>
          </div>
          <div>
            <TitleHeader className="mt-10" title="Communities" />
            <div className="grid grid-cols-music-card lg:grid-cols-1 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <MusicCard
                  action={joinAction}
                  title="TF-Nation"
                  title2="Members"
                  title3="Tyler Faye"
                  title4="1k+"
                  key={item}
                  buttonLabel="Join"
                />
              ))}
            </div>
          </div>
        </section> */
}
