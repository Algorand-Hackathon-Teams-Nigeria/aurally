import { Avatar, Image } from '@mantine/core'
import classes from './summary.module.css'
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
          <div className="text-[14.5px] font-bold">{name}</div>
          <div className="text-[11px] text-[#afafaf]">{date}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 w-max">
            <Avatar size={16} src={img} alt="music owner" />
            <div className="text-[11px] text-[#afafaf]">Tyler Faye</div>
          </div>
          <div className="w-8 h-8 grid place-items-center text-sm rounded-full bg-primary">{count}</div>
        </div>
      </div>
    </Link>
  )
}

export default SummaryBox
