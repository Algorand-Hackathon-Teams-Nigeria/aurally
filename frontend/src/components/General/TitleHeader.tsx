import { Link } from 'react-router-dom'

type Prop = {
  title: string
  link?: string
  className?: string
}

const TitleHeader = ({ title, className, link }: Prop) => {
  return (
    <div className={`flex justify-between items-center mb-4 ${className}`}>
      <div className="text-[22px] font-bold">{title}</div>
      <Link to={link || '#'} className="text-sm tracking-wider">
        View all
      </Link>
    </div>
  )
}

export default TitleHeader
