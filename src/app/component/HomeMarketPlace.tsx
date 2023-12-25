import { NftCarousel } from "@/app/component/NftCarousel";
import { ArtType, SoundType } from "@/types/assets";

const HomeMarketPlace = async ({
  nfts,
  type
}: {
  nfts: Promise<(SoundType | ArtType)[]>;
  type:string;
}) => {
  const data = await nfts;
  const filteredNft = data?.filter((item) =>
    type === "all" ? true : item.type === type
  );

  return (
    <NftCarousel data={filteredNft} />
  );
};

export default HomeMarketPlace;
