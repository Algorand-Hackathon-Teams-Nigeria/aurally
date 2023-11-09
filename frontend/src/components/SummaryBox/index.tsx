import { Avatar, Image } from '@mantine/core'
import classes from './summary.module.css'
import classes2 from '../MusicCard/musiccard.module.css'
import cover from '../../assets/music-cover.png'
import profile from '../../assets/nft-example.jpeg'
import { Link } from 'react-router-dom'

const SummaryBox = ({ to }: { to: string }) => {
  return (
    <Link to={to} className={classes.root}>
      <div className="h-10 w-10 rounded-sm overflow-hidden bg-[#444]">
        <Image loading="lazy" src={cover} classNames={{ root: classes.imgroot }} alt="" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <div className={classes2.title}>Beat the flow</div>
          <div className={classes2.title2}>Bid</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 w-max">
            <Avatar size={16} src={profile} alt="music owner" />
            <div className={classes2.title2}>Tyler Faye</div>
          </div>
          <div className={classes2.title3}>0.25 ETH</div>
        </div>
      </div>
    </Link>
  )
}

export default SummaryBox
