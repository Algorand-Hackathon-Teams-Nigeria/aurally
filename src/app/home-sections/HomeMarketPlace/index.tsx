import {
  NftCarousel,
  NftCarouselLoader,
} from "@/app/home-sections/HomeMarketPlace/NftCarousel";
import { ArtType, SoundType } from "@/types/assets";
import { TYPES } from "../../data";
import Link from "next/link";
import { Suspense } from "react";
import BallGradient from "@/app/component/BallGradient";

const PromiseCarousel = async ({
  nfts,
  type,
}: {
  nfts: Promise<(SoundType | ArtType)[]>;
  type: string;
}) => {
  const data = await nfts;
  const filteredNft = data?.filter((item) =>
    type === "all" ? true : item.type === type
  );

  return (
    <Suspense fallback={<NftCarouselLoader />}>
      <NftCarousel data={filteredNft} />
    </Suspense>
  );
};

const HomeMarketPlace = async ({
  type,
  nfts,
}: {
  type: string;
  nfts: Promise<(SoundType | ArtType)[]>;
}) => {
  return (
    <div className="relative">
      <BallGradient
        topOrBottom="top-40"
        leftOrRight="left-[calc(-9vw)]"
      />
      <BallGradient
        topOrBottom="bottom-[-125%]"
        leftOrRight="right-[calc(-9vw-50px)]"
      />
      <div>
        <div className="flex justify-between items-center  mt-14 mb-6">
          <div className="text-3xl md:text-4xl font-bold">Marketplace</div>
          <div id="home-carousel" className="flex gap-5 sm:gap-6"></div>
        </div>
        <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
          {TYPES.map((item) => (
            <Link
              scroll={false}
              href={{ pathname: "/", query: { type: item.value } }}
              key={item.label}
              className={`px-4 h-9 grid place-items-center rounded-full border border-primary ${
                type === item.value ? "bg-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <PromiseCarousel nfts={nfts} type={type} />
      </div>
    </div>
  );
};

export default HomeMarketPlace;
