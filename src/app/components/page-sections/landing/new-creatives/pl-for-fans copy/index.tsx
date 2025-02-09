"use client";

import Head from "next/head";
import React from "react";
import Image from "next/image";

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Aurally empowers artists to share their music, earn"
}) => (
  <div className="flex flex-col justify-center items-start gap-6 pr-4 sm:pr-16 sm:translate-x-[60px] mx-auto sm:mx-0 w-full max-w-[500px] ml-8 lg:translate-y-[0px] translate-y-[30px] lg:translate-y-[0px] translate-x-[-20px] 2xl:translate-x-[230px]">
    <h1 className="leading-[110%] font-bold text-3xl sm:text-6xl max-w-[635px] mx-auto sm:mx-0">
      {/* Mobile View - Centered Text */}
      <span className="block sm:hidden text-center">
        Revolutionising the
      </span>
      <span className="block sm:hidden text-center text-[#E22BCC]">
        Artist-Fan
      </span>
      <span className="block sm:hidden text-center text-yellow">
        Connection
      </span>

      {/* Desktop View - Left-aligned Text */}
      <span className="hidden sm:inline">Revolutionising </span>
      <span className="hidden sm:inline">the </span>
      <span className="hidden sm:inline text-[#E22BCC]">Artist-Fan </span>
      <span className="hidden sm:inline text-yellow">Connection</span>
    </h1>

    <p className="hero-subtitle mt-2 mx-auto sm:mx-0 translate-y-[-10px] ">
      Aurally empowers artists to share their music, earn directly through blockchain technology,
      and engage with a global audience like never before.
    </p>

  </div>
);

const HeroButtons = ({
  onGetStarted = () => console.log("Get Started clicked"),
  onExplore = () => console.log("Explore clicked"),
}) => (
  <div className="flex flex-col gap-2.5 mt-8 sm:ml-[-65px] ml-0 sm:mr-0 mr-4 w-full max-w-[500px] mx-auto translate-y-[20px] 2xl:translate-x-[170px]">
    <div className="flex gap-2.5 justify-center">
      <button
        className="flex items-center justify-center px-4 py-3 bg-[#8a2be2] text-white text-base font-bold rounded-full min-w-[128px] transition-all duration-300 ease-in-out hover:bg-[#7825c2]"
        onClick={onGetStarted}
      >
        <span>Get Started</span>
      </button>
      <button
        className="flex items-center justify-center px-4 py-3 border border-[#c6c6c6] text-[#c6c6c6] text-base font-bold rounded-full min-w-[121px] transition-all duration-300 ease-in-out hover:border-[#8a2be2] hover:text-[#8a2be2]"
        onClick={onExplore}
      >
        <span>Explore</span>
      </button>
    </div>
  </div>
);

const HomeCreatives = () => (
  <div>
    <Head>
      <title>Aurally - Discover, Stream, Collect NFTs</title>
      <meta
        name="description"
        content="Connect Directly with your favorite artists."
      />
    </Head>
    <main
      className="grid grid-cols-12 gap-8 px-4 pt-16 sm:pt-[200px] bg-cover bg-center min-h-screen sm:min-h-[calc(100vh+100px)]"
      style={{ backgroundImage: "url('/Black & White 1 1.png')" }}
    >
      {/* Left Column - HeroText */}
      <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-start">
        <HeroText />
        <HeroButtons />
      </div>

      {/* Right Column - Enlarged Image */}
      <div className="col-span-12 sm:col-span-6 flex justify-center items-center">
        <Image
          src="/images/girl-guitar.svg"
          alt="Girl with Guitar"
          className="w-full max-w-[600px] sm:max-w-[700px]"
          width={700} 
          height={700} 
        />
      </div>
    </main>
  </div>
);

export default HomeCreatives;