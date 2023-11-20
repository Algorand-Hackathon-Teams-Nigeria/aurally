import MusicCard from '../../components/MusicCard'
import { useAtomValue } from 'jotai'
import { filteredListAtom } from '../../store/atoms'

const MarketPlace = () => {
  const filteredList = useAtomValue(filteredListAtom)

  return (
    <div className="space-y-8 mb-32 routePage">
      <div>
        <div className="grid grid-cols-music-card gap-3">
          {filteredList.map((item) => (
            <MusicCard
              img={item.imgUrl}
              title={item.title}
              title2="Bid"
              title3={item.type === 'art' ? item.creator : item.artist}
              title4={`${Number(item.price)} ALGO`}
              key={item.id}
              buttonLabel={item.type === 'sound' ? 'Stream and Buy' : 'Buy'}
              link={`/dapp/marketplace/${item.type === 'sound' ? 'music' : 'art'}/${item.id}`}
            />
          ))}
          {filteredList.length === 0 && (
            <div className="w-full py-28  flex justify-center items-center text-center text-[#8A2BE2] font-bold">No NFTs found</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketPlace
