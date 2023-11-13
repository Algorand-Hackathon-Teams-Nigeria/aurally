import DaoCard from '../../components/DaoCard'

type Prop = {
  title: string
}

const DaoGrid = ({ title }: Prop) => {
  return (
    <div className="border border-[#444444] py-6 sm:py-8 px-[4%] sm:px-6 rounded-[10px]">
      <div className="text-2xl font-bold mb-6">{title}</div>
      <div className="grid grid-cols-dao-card gap-5">
        {[1, 2, 3, 4].map((item) => (
          <DaoCard key={item} title="Top 10 Songa" title2="Faye" title3="0.25 ALGO" />
        ))}
      </div>
    </div>
  )
}

const DAO = () => {
  return (
    <div className="routePage space-y-12 pb-32">
      <div className="routeName mb-14">DAO</div>
      <DaoGrid title="Trending Proposals" />
      <DaoGrid title="Open Proposals" />
    </div>
  )
}

export default DAO
