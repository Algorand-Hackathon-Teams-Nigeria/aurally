"use client";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import Image from "next/image";
import React, { useState } from "react";
import musicFest from "../../../assets/music-festiival.png";
import { Portal } from "@mantine/core";
import ScrollButton from "@/app/components/ScrollButton";

const eventdata = [musicFest];

const BlogCarousel = () => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  return (
    <>
      <Portal target="#blog-carousel">
        <ScrollButton embla={embla} />
      </Portal>
      <Carousel
        classNames={{
          root: "w-full",
        }}
        getEmblaApi={setEmbla}
        withControls={false}
      >
        {eventdata.map((item, index) => (
          <CarouselSlide key={index}>
            <div className="rounded-[10px] overflow-hidden">
              <Image src={item} alt="" />
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </>
  );
};

export default BlogCarousel;
