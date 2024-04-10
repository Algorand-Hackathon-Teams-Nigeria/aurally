"use client";
import { NftCard, NftCardLoader } from "@atoms/a-nft-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@ui/carousel";
import { GetNftsQuery } from "@/app/services/graphl_generated";

export const NftCarouselLoader = () => {
  return (
    <div className="overflow-hidden">
      <div className="w-max flex gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="max-w-[calc(100%-20px)] w-[270px]">
            <NftCardLoader />
          </div>
        ))}
      </div>
    </div>
  );
};

type NftCarouselProps = {
  data?: GetNftsQuery["soundNfts"];
};

export const NftCarousel = ({ data = [] }: NftCarouselProps) => {
  return (
    <Carousel className="w-full" opts={{ loop: true, align: "start" }}>
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4" key={Number(item.assetId ?? 0)}>
            <NftCard data={item} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
