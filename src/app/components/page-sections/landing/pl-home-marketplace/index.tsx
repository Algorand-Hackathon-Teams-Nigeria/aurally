"use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import classes from "@styles/landing.module.css";
import BallGradient from "@components/BallGradient";
import { useGetNftsQuery } from "@services/graphl_generated";
import { NftCarousel, NftCarouselLoader } from "@molecules/m-nft-carousel";

const HomeMarketPlace = () => {
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
        </div>
        <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
          <Button variant={"filled"} radius="xl">
            Music
          </Button>
        </div>
        {loading
          ? <NftCarouselLoader />
          : <NftCarousel data={data?.soundNfts} />}
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
