"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "@styles/landing.module.css";
import heroImage from "@assets/heroImage.png";


const onExplore = () => {
  console.log("Connect Wallet button clicked");
};
const HeroSection = () => {
  return (
    <section
      className={`${classes.herosection} w-full h-max lg:min-h-[100vh] lg:flex items-end overflow-hidden bg-[#8A2BE2]/70`}
      id="home"
    >
      <div className="lg:min-h-[87lvh] flex items-center justify-center px-[4.5%] md:px-0">
        <div className="relative z-[1] lg:right-[-20%] text-center lg:text-start pt-40 pb-0 lg:pb-24">
          <h1 className="text-[3.5rem] xl:text-[5rem] leading-[110%] font-bold max-w-[600px] lg:max-w-[500px] xl:max-w-[635px]">
            Discover, <span className="text-[#E22BCC]">Stream</span> and collect the <span className={classes.txt_grd}>Rarest NFTs</span>
          </h1>

          <div className="flex justify-center lg:justify-start gap-4 mt-8 lg:mt-12">
            <button
              className={`${classes.getBtn} flex items-center justify-center w-[163px] px-4 py-3 border border-[#c6c6c6] text-[#c6c6c6] text-base font-bold rounded-lg transition-all duration-300 ease-in-out hover:border-[#8a2be2] hover:text-[#8a2be2]`}
              onClick={onExplore}
            >
              Connect Wallet
            </button>

            <Link
              title="Marketplace"
              href="https://app.aurally.xyz/explore"
              target="_blank"
              className="flex items-center justify-center px-4 py-3 border border-[#c6c6c6] text-[#c6c6c6] text-base font-bold rounded-lg min-w-[163px] transition-all duration-300 ease-in-out hover:border-[#8a2be2] hover:text-[#8a2be2]"
              onClick={onExplore}
            >
              Explore
            </Link>
          </div>
        </div>

      </div>
      <Image
        src={heroImage}
        alt=""
        className="lg:hidden mx-auto max-h-[100vw] bg-contain bg-bottom"
        priority
      />
    </section>
  );
};

export default HeroSection;
