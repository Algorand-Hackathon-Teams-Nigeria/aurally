"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@mantine/core";
import { Embla } from "@mantine/carousel";
import BallGradient from "@components/BallGradient";
import ScrollButton from "@components/ScrollButton";
import classes from "../../styles/landing.module.css";
import { useGetNftsQuery } from "@services/graphl_generated";
import {
  NftCarousel,
  NftCarouselLoader,
} from "@/app/home-sections/HomeMarketPlace/NftCarousel";

const HomeMarketPlace = () => {
  // const [type, setType] = useState("all");
  const [embla, setEmbla] = useState<Embla | null>(null);
  const { data, loading } = useGetNftsQuery();

  return (
    <section id="marketplace" className="relative">
      <BallGradient topOrBottom="top-40" leftOrRight="left-[calc(-9vw)]" />
      <BallGradient
        topOrBottom="bottom-[-125%]"
        leftOrRight="right-[calc(-9vw-50px)]"
      />
      <div className="relative z-[5]">
        <div className="flex justify-between items-center  mt-14 mb-6">
          <div className="text-3xl md:text-4xl font-bold">Marketplace</div>
          <div className="flex gap-5 sm:gap-6">
            <ScrollButton embla={embla} />
          </div>
        </div>
        <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
          <Button variant={"filled"} radius="xl">
            Music
          </Button>
        </div>
        {loading
          ? <NftCarouselLoader />
          : <NftCarousel setEmbla={setEmbla} data={data?.soundNfts} />}
        <Link
          title="Marketplace"
          href="https://app.aurally.xyz/explore"
          target="_blank"
          className={`${classes.getBtn} flex w-max mx-auto mt-20`}
        >
          Explore Marketplace
        </Link>
      </div>
    </section>
  );
};

export default HomeMarketPlace;
