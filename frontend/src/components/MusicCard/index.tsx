import { AspectRatio, Avatar, Button, Card, Image, Text } from '@mantine/core'
import classes from './musiccard.module.css'
import { Link } from 'react-router-dom'

type Props = {
  img?: string
  title: string
  title2: string
  title3?: string
  title4?: string
  buttonLabel: string
  action?: () => void
  desc?: string
  link?: string
}

const MusicCard = ({ img, link, title, title2, title3, title4, buttonLabel, desc, action }: Props) => {
  return (
    <Card classNames={{ root: classes.root }}>
      <Card.Section>
        <AspectRatio ratio={4 / 3} classNames={{ root: 'overflow-hidden' }}>
          <Image src={img} className="object-cover object-top" alt="Norway" />
        </AspectRatio>
      </Card.Section>
      <div className="flex justify-between items-center gap-1 mt-2.5 mb-1.5">
        <Text classNames={{ root: classes.title }}>{title}</Text>
        <Text classNames={{ root: classes.title2 }}>{title2}</Text>
      </div>

      {title3 && title4 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            <Avatar size={14} src={img} alt="music owner" />
            <Text className=" truncate" classNames={{ root: classes.title2 }}>
              {title3}
            </Text>
          </div>
          <Text classNames={{ root: classes.title3 }}>{title4}</Text>
        </div>
      )}

      {desc && <div className="mb-3.5 font-sans text-[#AFAFAF] text-[11px] tracking-[0.5px]">{desc}</div>}

      {link ? (
        <Link to={link}>
          <Button classNames={{ root: classes.button }} size="sm">
            {buttonLabel}
          </Button>
        </Link>
      ) : (
        <Button classNames={{ root: classes.button }} size="sm" onClick={action}>
          {buttonLabel}
        </Button>
      )}
    </Card>
  )
}

export const MusicCardLoader = ({
  isDesc,
  isTitle3 = true,
  isTitle4 = true,
}: {
  isDesc?: boolean
  isTitle3?: boolean
  isTitle4?: boolean
}) => {
  return (
    <div className={classes.root} style={{ position: 'relative' }}>
      <div className="absolute top-0 left-0 bg-white/[0.03] w-full h-max pt-[70%]" />
      <AspectRatio ratio={4 / 3} />

      <div className="flex justify-between items-center gap-1 mt-2.5 mb-3">
        <div className=" w-7/12 rounded-xl h-3.5 bg-white/[0.03]" />
        <div className=" w-2/12 rounded-xl h-[11px] bg-white/[0.03]" />
      </div>

      {isTitle3 && isTitle4 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 w-max">
            <div className="w-3.5 h-3.5 bg-white/[0.03] rounded-full shrink-0" />
            <div className=" w-14 rounded-xl h-2.5 bg-white/[0.03]" />
          </div>
          <div className=" w-3/12 rounded-xl h-3.5 bg-white/[0.03]" />
        </div>
      )}

      {isDesc && (
        <div className="space-y-0.5 mb-3.5">
          <div className="rounded-xl w-9/12 h-[11px] bg-white/[0.03]" />
          <div className="rounded-xl w-9/12 h-[11px] bg-white/[0.03]" />
          <div className="rounded-xl w-9/12 h-[11px] bg-white/[0.03]" />
        </div>
      )}

      <div className="w-full h-9 rounded-lg bg-white/[0.03]" />
    </div>
  )
}

export default MusicCard
