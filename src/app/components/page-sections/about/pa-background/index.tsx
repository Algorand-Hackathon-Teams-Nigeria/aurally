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
import Image from "next/image";

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Aurally empowers artists to share their music, earn",
}) => (
  <div className="flex flex-col justify-start items-start gap-6 pr-4 sm:pr-16 mx-auto w-full max-w-[500px] sm:ml-0 2xl:max-w-[800px] lg:translate-y-[100px]">
    <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-5xl lg:text-6xl font-bold text-transparent bg-clip-text mb-4">
      Background
    </h2>
    <p className="text-lg 2xl:text-2xl">
      In the digital age, creativity knows no bounds. From music to visual
      art, creators around the globe are constantly pushing the boundaries
      of expression and innovation. However, navigating the complexities of
      the modern creative sector, particularly in the music industry, can be
      daunting for independent artists seeking recognition and fair
      compensation for their craft.
    </p>
    <p className="text-lg 2xl:text-xl">
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
      className="grid grid-cols-12 gap-8 px-4 pt-8 sm:pt-16 2xl:pt-4 lg:pt-2 bg-cover bg-center min-h-screen items-start"
    >
      <div className="col-span-12 sm:col-span-6 flex flex-col justify-start items-start">
        <HeroText />
      </div>

      <div className="col-span-12 sm:col-span-6 flex justify-center items-center 2xl:justify-end 2xl:pr-8 2xl:mt-[-80px] 2xl:translate-x-[200px] lg:translate-x-[-200px] lg:translate-y-[-130px] translate-x-[-150px] translate-y-[-80px]">
        <Image
          src="/headphones-about.png"
          alt="Girl with Guitar"
          width={1500}
          height={800}
          className="max-w-[1200px] sm:max-w-[500px] 2xl:min-w-[2000px] lg:min-w-[1500px]"
          style={{ userSelect: "none", pointerEvents: "none" }}
        />
      </div>
    </main>
  </div>
);

export default Background;
