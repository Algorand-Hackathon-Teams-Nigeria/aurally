import toast from 'react-hot-toast'
import TitleHeader from '../../components/General/TitleHeader'
import MusicCard from '../../components/MusicCard'
import SummaryBox from '../../components/SummaryBox'
import classes from '../Home/home.module.css'

const Communities = () => {
  const joinAction = () => {
    toast.success('Join A community')
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 routePage">
      <section className="flex-1">
        <TitleHeader title="Trending Music" />
        <div className="grid gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <SummaryBox to="12" key={item} />
          ))}
        </div>
      </section>
      <section className={classes.widget}>
        <TitleHeader title="Communities" />
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
      </section>
    </div>
  )
}

export default Communities
