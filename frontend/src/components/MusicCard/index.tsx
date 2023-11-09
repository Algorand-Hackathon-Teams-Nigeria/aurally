import { Avatar, Button, Card, Image, Text } from '@mantine/core'
import classes from './musiccard.module.css'
import example from '../../assets/nft-example.jpeg'

type Props = {
  img?: string
  title: string
  title2: string
  title3?: string
  title4?: string
  buttonLabel: string
  action: () => void
  desc?: string
}

const MusicCard = ({ img = example, title, title2, title3, title4, buttonLabel, desc, action }: Props) => {
  return (
    <Card classNames={{ root: classes.root }}>
      <Card.Section>
        <Image src={img} className="object-cover object-top h-[139px]" alt="Norway" />
      </Card.Section>

      <div className="flex justify-between items-center mt-2.5 mb-2">
        <Text classNames={{ root: classes.title }}>{title}</Text>
        <Text classNames={{ root: classes.title2 }}>{title2}</Text>
      </div>

      {title3 && title4 && (
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1 w-max">
            <Avatar size={14} src={example} alt="music owner" />
            <Text classNames={{ root: classes.title2 }}>{title3}</Text>
          </div>
          <Text classNames={{ root: classes.title3 }}>{title4}</Text>
        </div>
      )}

      {desc && <div className="mb-3.5 font-sans text-[#AFAFAF] text-xs tracking-[0.5px]">{desc}</div>}

      <Button classNames={{ root: classes.button }} size="sm" onClick={action}>
        {buttonLabel}
      </Button>
    </Card>
  )
}

export default MusicCard
