type Prop = {
  title: string
  link?: string
  className?: string
}

const TitleHeader = ({ title, className }: Prop) => {
  return (
    <div className={`flex justify-between items-center mb-4 ${className}`}>
      <div className="text-[22px] font-bold">{title}</div>
      <div className="text-sm tracking-wider">View all</div>
    </div>
  )
}

export default TitleHeader
