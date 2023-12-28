"use client";
import { Embla } from "@mantine/carousel";
import { useEffect, useState } from "react";
import arrowLeft from "../../assets/arrow-circle-left.png";
import arrowRight from "../../assets/arrow-circle-right.png";
import Image from "next/image";

type Props = {
  embla: Embla | null;
};

const ScrollButton = ({ embla }: Props) => {
  const onPrev = () => embla?.scrollPrev();
  const onNext = () => embla?.scrollNext();

  const [bools, setBools] = useState({
    prev: true,
    next: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (!embla) return;
      setBools({ prev: !embla.canScrollPrev(), next: !embla.canScrollNext() });
    };

    if (embla) {
      embla.on("scroll", handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
    <>
      <button
        onClick={onPrev}
        disabled={bools.prev}
        className="bg-transparent transform-gpu transition-transform enabled:active:scale-[0.975] pointer-events-auto"
      >
        <Image
          src={arrowLeft}
          alt="arrow-left"
          className=" scale-90 sm:scale-100"
        />
      </button>
      <button
        onClick={onNext}
        disabled={bools.next}
        className="bg-transparent transform-gpu transition-transform enabled:active:scale-[0.975] pointer-events-auto"
      >
        <Image
          src={arrowRight}
          alt="arrow-left"
          className="scale-90 sm:scale-100"
        />
      </button>
    </>
  );
};

export default ScrollButton;
