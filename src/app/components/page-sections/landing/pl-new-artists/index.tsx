"use client";

import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import EmblaCarousel from '@ui/EmblaCarousel';

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Connect Directly with your favourite artists"
}) => (
  <div className="hero-text-container sm:ml-40 text-center sm:text-left">
    <h1
      className="leading-[110%] font-bold text-4xl sm:text-4xl max-w-[635px] mx-auto sm:mx-0 sm:mt-[-330px] translate-y-[20px] lg:translate-x-0 translate-x-[50px]"
    >
      <span className="">Discover, </span>
      <span className=" text-transparent bg-clip-text bg-gradient-to-r from-[#E22BCC] to-[#FBB03B]">
        Stream
      </span>
      <span className="block sm:inline"> and {" "}collect the <span className=" block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#E22BCC] to-[#FBB03B]">
        Rarest NFTs
      </span>
      </span>
    </h1>
    <p className="hero-subtitle mt-2 mx-auto sm:mx-0 translate-y-[20px] lg:translate-x-0 translate-x-[40px]">{subtitle}</p>
  </div>
);

const HeroButtons = ({
  onGetStarted = () => console.log('Get Started clicked'),
  onExplore = () => console.log('Explore clicked'),
}) => (
  <div className="flex flex-col gap-2.5 mt-8 sm:ml-40 ml-0 sm:mr-0 mr-4 w-full max-w-[500px] mx-auto translate-y-[20px]">
    <div className="flex gap-2.5 justify-center">
      <button
        className="flex items-center justify-center px-4 py-3 bg-[#8a2be2] text-white text-base font-bold rounded-full min-w-[128px] transition-all duration-300 ease-in-out hover:bg-[#7825c2]"
        onClick={onGetStarted}
      >
        <span>Get Started</span>
      </button>
      <button
        className="flex items-center justify-center px-4 py-3 border border-[#c6c6c6] text-[#c6c6c6] text-base font-bold rounded-full min-w-[121px] transition-all duration-300 ease-in-out hover:border-[#8a2be2] hover:text-[#8a2be2]"
        onClick={() => window.location.href = 'https://app.aurally.xyz/explore'}
      >
        <span>Explore</span>
      </button>
    </div>
  </div>
);

const HomePage = () => (
  <div>
    <Head>
      <title>Aurally - Discover, Stream, Collect NFTs</title>
      <meta name="description" content="Connect Directly with your favorite artists." />
    </Head>
    <main
      className="grid grid-cols-12 gap-8 px-4 pt-16 sm:pt-[200px] bg-cover bg-center min-h-screen sm:min-h-[calc(100vh+100px)]"
      style={{ backgroundImage: "url('/Black & White 1 1.png')" }}
    >
      {/* Left Column - HeroText */}
      <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-start">
        <HeroText />

        <div className="flex sm:hidden mt-4 w-full">
          <HeroButtons />
        </div>
      </div>

      {/* Right Column - Phone Image */}
      <div
        className="col-span-12 sm:col-span-6 flex justify-center items-center sm:mt-[70px] mt-[10px] sm:mb-16 relative"
        style={{
          backgroundImage: "url('/landing_background 1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        {/* Mobile background override */}
        <div
          className="sm:hidden absolute inset-0"
          style={{
            backgroundImage: "url('/mobile-background.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
          }}
        />
        {/* Phone Mockup Image */}
        <Image
          src="/images/phone mockup.svg"
          alt="Phone Mockup"
          width={300}
          height={600}
          className="w-80 md:w-96 lg:w-full max-h-[85vh] object-contain z-10"
        />
      </div>

      {/* Embla Carousel and Buttons for Desktop */}
      <div className="col-span-12 flex flex-col justify-center items-start sm:mt-8">
        <div className="flex flex-row gap-6 mt-[-530px] sm:mt-[-770px]">
          <div key="carousel" className="flex flex-col gap-4 w-full">
            <EmblaCarousel />
          </div>
        </div>
        <div className="hidden sm:flex mt-4">
          <HeroButtons />
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;
