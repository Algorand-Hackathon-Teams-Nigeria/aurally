"use client";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import { NftCardLoader, NftCard } from "../NftCard";
import { ArtType, SoundType } from "@/types/assets";
import { useState } from "react";
import { Portal } from "@mantine/core";
import ScrollButton from "../../../component/ScrollButton";

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
  data?: (ArtType | SoundType)[];
};

export const NftCarousel = ({ data = [] }: NftCarouselProps) => {
  const [embla, setEmbla] = useState<Embla | null>(null);

  return (
    <>
      <Portal target="#home-carousel">
        <ScrollButton embla={embla} />
      </Portal>
      <Carousel
        classNames={{
          root:"w-full",
          slide: "max-w-[calc(100%-20px)] min-[320px]:max-w-[285px]",
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
          <CarouselSlide key={Number(item.data.asset_id ?? 0)}>
            <NftCard data={item} />
          </CarouselSlide>
        ))}
      </Carousel>
    </>
  );
};
