/*import Image from "next/image";
import BallGradient from "@components/BallGradient";

const Background = () => {
  return (
    <section
      id="background"
      className="flex flex-col items-center gap-20 xl:flex-row"
    >
      <BallGradient topOrBottom="top-8" leftOrRight="right-8" />
      <BallGradient topOrBottom="top-48" leftOrRight="left-8" />
      <div className="flex-1 flex flex-col gap-8">
        <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-5xl lg:text-6xl font-bold text-transparent bg-clip-text mb-4">
          Background
        </h2>
        <p className="text-lg">
          In the digital age, creativity knows no bounds. From music to visual
          art, creators around the globe are constantly pushing the boundaries
          of expression and innovation. However, navigating the complexities of
          the modern creative sector, particularly in the music industry, can be
          daunting for independent artists seeking recognition and fair
          compensation for their craft.
        </p>
        <p className="text-lg">
          At Aurally, we believe in championing artistic freedom. Our platform
          is designed to{" "}
          <span className="bg-gradient-to-r from-secondaryPink to-secondaryYellow text-transparent bg-clip-text">
            empower musicians, artists, and creators to reclaim ownership of
            their work.
          </span>{" "}
          With Aurally, creators can manage, share their creations with the
          world and monetize in real time.
        </p>
      </div>
      <div className="col-span-12 sm:col-span-6 flex justify-center items-center">
        <Image
          src="/images/headphones-about.png"
          alt="Guy imersed in VR"
          width={513}
          height={439}
           className="w-full h-full sm:h-auto sm:w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Background;*/



"use client";

import Head from "next/head";
import React from "react";

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Aurally empowers artists to share their music, earn"
}) => (
  <div className="flex flex-col justify-center items-start gap-6 pr-4 sm:pr-16 sm:translate-x-[-30px] mx-auto sm:mx-0 w-full max-w-[500px] sm:ml-1200 ml-[0px] translate-y-[0px] lg:translate-y-[-200px]">
  <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-5xl lg:text-6xl font-bold text-transparent bg-clip-text mb-4">
          Background
        </h2>
        <p className="text-lg">
          In the digital age, creativity knows no bounds. From music to visual
          art, creators around the globe are constantly pushing the boundaries
          of expression and innovation. However, navigating the complexities of
          the modern creative sector, particularly in the music industry, can be
          daunting for independent artists seeking recognition and fair
          compensation for their craft.
        </p>
        <p className="text-lg">
          At Aurally, we believe in championing artistic freedom. Our platform
          is designed to{" "}
          <span className="bg-gradient-to-r from-secondaryPink to-secondaryYellow text-transparent bg-clip-text">
            empower musicians, artists, and creators to reclaim ownership of
            their work.
          </span>{" "}
          With Aurally, creators can manage, share their creations with the
          world and monetize in real time.
        </p>
</div>

);





const Background = () => (
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
      
    >
      {/* Left Column - HeroText */}
      <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-start">
        <HeroText />
       
      </div>

      {/* Right Column */}
      <div className="col-span-12 sm:col-span-6 flex justify-center items-center translate-x-[-270px] lg:translate-x-90 translate-y-[-205px] lg:translate-y-[-270px]">
      <img
  src="/headphones-about.png"
  alt="Girl with Guitar"
  className=" max-w-[1200px] sm:max-w-[1500px] "
/>

      </div>
    </main>
  </div>
);

export default Background;
