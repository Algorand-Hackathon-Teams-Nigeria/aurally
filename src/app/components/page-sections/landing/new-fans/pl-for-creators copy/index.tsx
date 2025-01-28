import React from "react";
import Image from "next/image";
import ArtistIcon from "@assets/material-symbols-light_artist-outline.png";
import StockMarket from "@assets/icon-park-outline_stock-market.png";
import AurallyFoster from "@assets/material-symbols-light_artist-outline-1.png";





const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = (
    <>
      <span className="block">Aurally makes it effortless to directly support your favourite artists.</span>
      <span className="block">with seamless Web3 payment options, including popular crytocurrencies, you can back</span>
      <span className="block">creators from all around the globe. Empower your connection to music and creativity in a </span>
      <span className="block">way that's is truly yours. </span>
    </>
  ),
}) => (
  <div className="hero-text-container mt-[200px]"> 
    <div className="ml-[-7px]">
      <h1 className="leading-[110%] font-bold text-4xl max-w-[635px]">
        Support Your <span className="text-[#E22BCC]">Faves,</span>{" "}
        <span className="block">Your Way.</span>
      </h1>
      <p className="hero-subtitle mt-2">{subtitle}</p>
    </div>
    
    
    <div className="mt-6 w-screen overflow-hidden">
      <Image
        src="/Frame 1000008326.png"
        alt="Hero Supporting Image"
        width={1920} 
        height={400} 
        className="object-cover w-full" 
        priority 
      />
    </div>
  </div>
);









const ForCreatorsNew = () => {
  return (
    <section id="for-creators">
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="flex flex-col justify-start gap-8">
          <h2 className="text-[2rem] xl:text-[3rem] leading-[110%] font-bold max-w-[635px]">
            Discover New Sounds, connect with your favs
          </h2>

          <div className="flex items-center gap-2 h-full">
            <Image
              src={ArtistIcon}
              alt="Artist"
              className="w-8 h-8" 
            />
            <div className="rounded-[10px] p-2 h-full lg:pt-7">
              Aurally curates diverse music.
            </div>
          </div>

          <div className="flex items-center gap-2 h-full">
            <Image
              src={StockMarket}
              alt="Stock Market"
              className="w-8 h-8"
            />
            <div className="rounded-[10px] p-2 h-full lg:pt-7">
              Stream-to-Earn rewards loyalty.
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 h-full">
            <Image
              src={AurallyFoster}
              alt="Aurally Foster"
              className="w-8 h-8" 
            />
            <div className="rounded-[10px] p-2 h-full">
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
