"use client";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import Image from "next/image";
import React, { useState } from "react";
import musicFest from "../../../assets/music-festiival.png";
import { Portal } from "@mantine/core";
import ScrollButton from "@/app/component/ScrollButton";

const eventdata = [musicFest];

const EventsCarousel = () => {
  const [embla, setEmbla] = useState<Embla | null>(null);
  return (
    <>
      <Portal target="#event-carousel">
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

export default EventsCarousel;
