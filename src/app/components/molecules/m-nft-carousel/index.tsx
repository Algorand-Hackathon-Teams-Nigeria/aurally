"use client";
import { Dispatch, SetStateAction } from "react";
import { EmblaCarouselType } from "embla-carousel-react";
import { Carousel, CarouselSlide } from "@mantine/carousel";
import { NftCard, NftCardLoader } from "@atoms/a-nft-card";

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
  data?: SoundCardType[];
  setEmbla: Dispatch<SetStateAction<EmblaCarouselType | null>>;
};

export const NftCarousel = ({ data = [], setEmbla }: NftCarouselProps) => {
  return (
    <Carousel
      classNames={{
        root: "w-full",
        slide: "max-w-[calc(100%-20px)] min-[320px]:max-w-[285px]",
        container: "gap-4",
      }}
      getEmblaApi={setEmbla}
      containScroll="trimSnaps"
      slideSize="285px"
      slideGap={{ base: 12, sm: 16 }}
      slidesToScroll={"auto"}
      align="end"
      withControls={false}
    >
      {data.map((item) => (
        <CarouselSlide key={Number(item.assetId ?? 0)}>
          <NftCard data={item} />
        </CarouselSlide>
      ))}
    </Carousel>
  );
};
