import React from "react";
import Image from "next/image";
import ArtistIcon from "@assets/material-symbols-light_artist-outline.png";
import StockMarket from "@assets/icon-park-outline_stock-market.png";
import AurallyFoster from "@assets/material-symbols-light_artist-outline-1.png";

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = (
    <>
      <span className="block">Aurally&apos;s Web3 platform makes it effortless to directly support your favourite artists.</span>
      <span className="block">With seamless Web3 payment options, including popular cryptocurrencies, you can back</span>
      <span className="block">creators from all around the globe. Empower your connection to music and creativity in a</span>
      <span className="block">way that&apos;s truly yours.</span>
    </>
  ),
}) => (
  <div
    className="hero-text-container left-0 w-screen min-h-screen translate-y-[150px] lg:translate-y-[100px] lg:translate-x-[5px] translate-x-[-5px] 2xl:translate-y-[-20px]"
    style={{
      backgroundImage: "url('/images/concert 1.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="ml-[-7px] pt-[50px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px]">
      <h1 className="leading-[110%] font-bold text-4xl max-w-[635px] lg:translate-x-[410px] translate-x-[60px] translate-x-0 lg:translate-y-[0px] translate-y-[-30px] 2xl:translate-x-[820px] ">
        More For Creatives
      </h1>
    </div>

    {/* Desktop View */}
    <div className="hidden lg:block mt-6 w-screen overflow-hidden lg:translate-x-[150px] translate-x-[3px] translate-x-0 lg:translate-y-[50px] translate-y-[50px] 2xl:translate-x-[250px]">
      <Image
        src="/more for creatives.png"
        alt="Hero Supporting Image"
        width={1920}
        height={400}
        className="object-cover w-full lg:w-[75%] lg:h-auto"
        priority
      />
    </div>

    {/* Mobile View */}
    <div className="block lg:hidden mt-6 space-y-6 px-4">
      <Image
        src="/maximize-earn.png"
        alt="Mobile Image 1"
        width={300}
        height={200}
        className="object-cover max-w-[80%] mx-auto h-auto"
        priority
      />
      <Image
        src="/direct-fan.png"
        alt="Mobile Image 2"
        width={300}
        height={200}
        className="object-cover max-w-[80%] mx-auto h-auto"
        priority
      />
      <Image
        src="/innovative.png"
        alt="Mobile Image 3"
        width={300}
        height={200}
        className="object-cover max-w-[80%] mx-auto h-auto"
        priority
      />
    </div>
  </div>
);

const ForCreatives = () => {
  return (
    <section
      id="for-creators"
      className="sm:mt-8 sm:mb-8 lg:mt-0 lg:mb-0 2xl:translate-y-[70px]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 translate-y-[100px] lg:translate-y-[10px] 2xl:translate-y-[-80px]">
        {/* Left Column */}
        <div className="flex flex-col justify-start gap-8 2xl:translate-x-[250px] lg:translate-x-[60px]">
          <h2 className="text-[2rem] xl:text-[3rem] leading-[110%] font-bold max-w-[635px]">
          <span className="sm:inline text-[#E22BCC]">Empowering </span> Creatives to {" "}Thrive
          </h2>

          <div className="flex items-center gap-2 h-full">
            <Image
              src={ArtistIcon}
              alt="Artist"
              className="w-8 h-8 "
            />
            <div className="rounded-[10px] p-2 h-full lg:pt-7">
             Share Creativity, Gain Recognition
            </div>
          </div>

          <div className="flex items-center gap-2 h-full">
            <Image
              src={StockMarket}
              alt="Stock Market"
              className="w-8 h-8"
            />
            <div className="rounded-[10px] p-2 h-full lg:pt-7">
              Sell Directly, Keep Earnings.
            </div>
          </div>

          <div className="flex items-center gap-2 flex-1 h-full">
            <Image
              src={AurallyFoster}
              alt="Aurally Foster"
              className="w-8 h-8"
            />
            <div className="rounded-[10px] p-2 h-full">
              Connect, Engage, Build Community
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="overflow-x-scroll relative w-full h-[400px] translate-x-[-70px] lg:translate-x-0 pt-[-400px] 2xl:translate-x-[-80px]">
          <Image
            src="/images/empowered artist 1.svg"
            alt="Frame Image"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <HeroText />
    </section>
  );
};

export default ForCreatives;