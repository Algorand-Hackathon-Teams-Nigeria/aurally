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
        <AspectRatio ratio={4 / 3} className="overflow-hidden">
          <Image
            src={img}
            className="object-cover object-top w-full h-full hover:scale-125 transition ease-in-out duration-500"
            alt="Norway"
          />
        </AspectRatio>
      </Card.Section>

      <div className="flex justify-between items-center mt-2.5 mb-1.5">
        <Text classNames={{ root: classes.title }}>{title}</Text>
        <Text classNames={{ root: classes.title2 }}>{title2}</Text>
      </div>

      {title3 && title4 && (
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 w-max">
            <Avatar size={14} src={img} alt="music owner" />
            <Text classNames={{ root: classes.title2 }}>{title3}</Text>
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

export default MusicCard
