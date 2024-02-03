"use client";
import {
  NftCarousel,
  NftCarouselLoader,
} from "@/app/home-sections/HomeMarketPlace/NftCarousel";
// import { TYPES } from "../../data";
import Link from "next/link";
import BallGradient from "@/app/component/BallGradient";
import classes from "../../styles/landing.module.css";
import { useGetNftsQuery } from "@/app/services/graphl_generated";
import { useState } from "react";
import { Button } from "@mantine/core";
import { Embla } from "@mantine/carousel";
import ScrollButton from "@/app/component/ScrollButton";

const HomeMarketPlace = () => {
  // const [type, setType] = useState("all");
  const [embla, setEmbla] = useState<Embla | null>(null);
  const { data, loading } = useGetNftsQuery();

  return (
    <div className="relative">
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
          {/* {TYPES.map((item) => (
            <Button
              key={item.label}
              variant={item.value === type ? "filled" : "outline"}
              radius="xl"
              onClick={() => setType(item.value)}
            >
              {item.label}
            </Button>
          ))} */}
        </div>
        {loading ? (
          <NftCarouselLoader />
        ) : (
          <NftCarousel setEmbla={setEmbla} data={data?.soundNfts} />
        )}
        <Link
          href="https://app.aurally.xyz/explore"
          className={`${classes.getBtn} flex w-max mx-auto mt-20`}
        >
          Explore Marketplace
        </Link>
      </div>
    </div>
  );
};

export default HomeMarketPlace;
