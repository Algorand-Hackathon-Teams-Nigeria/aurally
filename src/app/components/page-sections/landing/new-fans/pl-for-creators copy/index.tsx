import React from "react";
import Image from "next/image";
import ArtistIcon from "@assets/material-symbols-light_artist-outline.png";
import StockMarket from "@assets/icon-park-outline_stock-market.png";
import AurallyFoster from "@assets/material-symbols-light_artist-outline-1.png";
import InfiniteCarousel from "@ui/newcarousel";

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = (
    <>
      <span className="block">Aurally&apos;s Web3 platform guarantees artists a bigger share of</span>
      <span className="block">with seamless Web3 payment options, including popular cryptocurrencies, you can back</span>
      <span className="block">creators from all around the globe. Empower your connection to music and creativity in a</span>
      <span className="block">way that&apos;s truly yours. </span>
    </>
  ),
}) => (
  <div className="hero-text-container mt-[200px]"> 
    <div className="ml-[-7px]">
      <h1 className="leading-[110%] font-bold text-4xl max-w-[635px]">
        Support Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E22BCC] to-[#FBB03B]">
          Faves,
        </span>
        <span className="block">Your Way.</span>
      </h1>
      <p className="hero-subtitle mt-2">{subtitle}</p>
    </div>
    
    <div className="mt-6 w-screen overflow-hidden">
      <InfiniteCarousel />
    </div>
  </div>
);



const ForCreatorsNew = () => {
  return (
    <section id="for-creators">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 translate-y-0 lg:translate-y-[-40px]">
        
        <div className="flex flex-col justify-start gap-4 lg:gap-6">
          <h2 className="text-[2rem] xl:text-[3rem] leading-[110%] font-bold max-w-[635px] lg:text-[3.5rem]">
            Discover New Sounds, connect with your favs
          </h2>

          {/* First Flex Row: Image + Text */}
          <div className="flex items-center gap-4">
            <Image
              src={ArtistIcon}
              alt="Artist"
              className="w-8 h-8 lg:w-12 lg:h-12" // Increased size for desktop
            />
            <div className="rounded-[10px] p-2 lg:text-[1.25rem]"> {/* Increased font size for desktop */}
              Aurally curates diverse music.
            </div>
          </div>

          {/* Second Flex Row: Image + Text */}
          <div className="flex items-center gap-4">
            <Image
              src={StockMarket}
              alt="Stock Market"
              className="w-8 h-8 lg:w-12 lg:h-12" // Increased size for desktop
            />
            <div className="rounded-[10px] p-2 lg:text-[1.25rem]">
              Stream-to-Earn rewards loyalty.
            </div>
          </div>

          {/* Third Flex Row: Image + Text */}
          <div className="flex items-center gap-4">
            <Image
              src={AurallyFoster}
              alt="Aurally Foster"
              className="w-8 h-8 lg:w-12 lg:h-12" // Increased size for desktop
            />
            <div className="rounded-[10px] p-2 lg:text-[1.25rem]">
              Fans access exclusive interactions.
            </div>
          </div>
        </div>

        <div className="overflow-x-scroll relative w-full h-[400px] lg:block hidden">
          <Image
            src="/Frame 1000008329.png"
            alt="Frame Image"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <HeroText />
    </section>
  );
};


export default ForCreatorsNew;