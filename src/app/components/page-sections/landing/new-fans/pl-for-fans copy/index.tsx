"use client";

import Head from 'next/head';
import React from 'react';


const artistGroup = {
  image: '/Artists group.png', 
};

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Connect Directly with your favourite artists"
}) => (
  <div className="hero-text-container sm:ml-40 text-center sm:text-left">
  
  <h1
    className="leading-[110%] font-bold text-4xl sm:text-4xl max-w-[635px] mx-auto sm:mx-0 sm:mt-[-330px] translate-y-[20px]"
  >
    <span className="block sm:inline">Discover,</span> 
    <span className="block sm:inline text-[#E22BCC]"> Stream</span> 
    <span className="block sm:inline"> and collect the <span className="text-yellow">Rarest NFTs</span></span> 
  </h1>

  <p className="hero-subtitle mt-2 mx-auto sm:mx-0 translate-y-[20px]">{subtitle}</p>
</div>

);

const ArtistGroup = ({ artist = artistGroup }) => (
  <div className="flex flex-row gap-6 mt-[-530px] sm:mt-[-770px]">
    <div key="group" className="flex flex-col gap-4 w-full">
      
      <img
        src="/Artists mobile group.png" 
        alt="Artists Group Mobile"
        className="w-full h-[350px] sm:hidden rounded-lg object-cover translate-y-[80px]" 
      />
      <img
        src={artist.image} 
        alt="Artists Group"
        className="hidden sm:block w-full h-72 lg:h-80 rounded-lg object-cover translate-y-[40px]" 
      />
    </div>
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
        onClick={onExplore}
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
        {/* Buttons positioned separately for mobile and desktop */}
        <div className="flex sm:hidden mt-4 w-full">
          <HeroButtons />
        </div>
      </div>

      {/* Right Column - Phone Image */}
<div
  className="col-span-12 sm:col-span-6 flex justify-center items-center sm:mt-[70px] mt-[10px] sm:mb-16 relative" // Increased margin-top for desktop and mobile-specific margin
  style={{
    backgroundImage: "url('/landing_background 1.png')", // Default background for larger screens
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
  }}
>
  {/* Mobile background override */}
  <div
    className="sm:hidden absolute inset-0" // Mobile background for mobile view only
    style={{
      backgroundImage: "url('/mobile-background.png')", // Mobile background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1, // Keep mobile background below the other content
    }}
  />
  
  {/* Phone Mockup Image */}
  <img
    src="/hero phone image 1.png"
    alt="Phone Mockup"
    className="w-80 md:w-96 lg:w-full max-h-[85vh] object-contain z-10" // Ensure this image is on top
  />
</div>



      {/* Artist Group and Buttons for Desktop */}
      <div className="col-span-12 flex flex-col justify-center items-start sm:mt-8">
        <ArtistGroup />
        <div className="hidden sm:flex mt-4">
          <HeroButtons />
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;

