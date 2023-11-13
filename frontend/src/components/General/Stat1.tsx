const Stat1 = ({ title, title2 }: { title: string; title2: string }) => {
  return (
    <div>
      <div className="text-sm font-sans mb-1">{title}</div>
      <div className="bg-[#444] flex p-2 justify-center items-center gap-2.5 rounded text-xs sm:text-sm">{title2}</div>
    </div>
  )
}

export default Stat1
