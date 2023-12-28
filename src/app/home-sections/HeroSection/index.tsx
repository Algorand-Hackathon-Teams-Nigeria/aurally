import React from "react";
import Image from "next/image";
import BallGradient from "../../component/BallGradient";
import classes from "../../styles/landing.module.css";
import Link from "next/link";
import Group from "../../assets/Group.png"

const HeroSection = () => {
  return (
    <div className="w-full px-[4%] relative grid place-items-center overflow-hidden">
      <BallGradient topOrBottom="top-[-43px]" leftOrRight="left-[-79px]" />
      <BallGradient
        topOrBottom="bottom-[-250px]"
        leftOrRight="left-1/2 -translate-x-1/2"
      />
      <BallGradient
        topOrBottom="bottom-[-350px]"
        leftOrRight="right-[-200px]"
      />
      <div className="absolute inset-0 pt-40 flex justify-end">
        <Image
          src={Group}
          className="object-right min-w-[834px] h-max"
          width={1551}
          height={1700}
          alt=""
        />
      </div>
      <div className="text-center relative pt-[189px] pb-[135px] lg:pt-[300px] lg:pb-[150px]">
        <h1 className="text-4xl lg:text-5xl xl:text-[4rem] font-bold max-w-[902px]">
          Discover, <span className={classes.txt_grd}>Stream</span> and collect
          the <span className={classes.txt_grd}>Rarest Nfts</span>
        </h1>
        <div className="text-sm min-[420px]:text-base md:text-lg xl:text-xl mt-7">
          The No 1. NFT Marketplace.
        </div>
        <Link
          href="https://dapp.aurally.xyz"
          className={`${classes.getBtn} flex max-w-[163px] mt-12 mx-auto`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
