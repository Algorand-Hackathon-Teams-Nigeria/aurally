import { Avatar, Image } from '@mantine/core'
import classes from './summary.module.css'
import classes2 from '../MusicCard/musiccard.module.css'
import cover from '../../assets/music-cover.png'
import { Link } from 'react-router-dom'

type Prop = { to: string; name: string; date: string; count: number; img: string }

const SummaryBox = ({ to, count, date, name, img }: Prop) => {
  return (
    <Link to={to} className={classes.root}>
      <div className="h-10 w-10 rounded-sm overflow-hidden bg-[#444]">
        <Image loading="lazy" src={cover} classNames={{ root: classes.imgroot }} alt="" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <div className={classes2.title}>{name}</div>
          <div className={classes2.title2}>{date}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 w-max">
            <Avatar size={16} src={img} alt="music owner" />
            <div className={classes2.title2}>Tyler Faye</div>
          </div>
          <div className="w-8 h-8 grid place-items-center text-sm rounded-full bg-primary">{count}</div>
        </div>
      </div>
    </Link>
  )
}

export default SummaryBox
