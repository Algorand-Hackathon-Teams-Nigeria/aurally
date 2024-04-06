"use client";
import Image from "next/image";
import { Portal } from "@mantine/core";
import React, { useState } from "react";
import { Carousel, CarouselSlide, Embla } from "@mantine/carousel";
import musicFest from "@assets/music-festiival.png";
import ScrollButton from "@components/ScrollButton";

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
            <div className="rounded-[10px] w-full overflow-hidden">
              <Image
                className="w-full"
                src={item}
                alt=""
                loading="lazy"
                placeholder="blur"
              />
            </div>
          </CarouselSlide>
        ))}
      </Carousel>
    </>
  );
};

export default EventsCarousel;
