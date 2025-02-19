import React from "react";
import Image from "next/image";
import ArtistIcon from "@assets/material-symbols-light_artist-outline.png";
import StockMarket from "@assets/icon-park-outline_stock-market.png";
import AurallyFoster from "@assets/material-symbols-light_artist-outline-1.png";
import Profit from "@assets/game-icons_profit.svg";
import Team from "@assets/Vector.svg";
import Wallet from "@assets/game-icons_wallet.svg";

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
    className="hero-text-container left-0 w-screen min-h-screen translate-y-[150px] lg:translate-y-[100px] lg:translate-x-[5px] translate-x-[-18px] 2xl:translate-y-[-20px]  translate-x-[-22px] mt-[10px]"
    style={{
      backgroundImage: "url('/images/concert 1.svg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="ml-[-7px] pt-[50px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px]">
      <h1 className="leading-[110%] font-bold text-4xl max-w-[635px] lg:translate-x-[510px] translate-x-[60px] translate-x-0 lg:translate-y-[0px] translate-y-[-30px] 2xl:translate-x-[820px] ">
        More For Creatives
      </h1>
    </div>

    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-3 md:gap-5 p-5 w-full max-w-6xl mx-auto lg:translate-y-[50px] lg:translate-x-[0px] 2xl:translate-x-[0px] translate-x-[-1px]">
      {/* Maximize Earnings Card */}
      <div className="order-1 bg-[#140425] rounded-lg border border-gray-700 p-10 hover:shadow-lg hover:-translate-y-1 transition-transform">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <Image src={Profit} width={56} height={56} alt="Profit icon" />
            <h2 className="text-2xl font-bold text-white">Maximize Your Earnings</h2>
          </div>
          <hr className="w-full border-t border-white/20" />
          <p className="text-lg text-gray-400">
          Aurally&apos;s Web3 platform ensures artists receive a fair share of revenue, surpassing traditional streaming services.
          </p>
        </div>
      </div>

      {/* Fan Engagement Card */}
      <div className="order-2 bg-[#140425] rounded-lg border border-gray-700 p-10 hover:shadow-lg hover:-translate-y-1 transition-transform">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <Image src={Team} width={56} height={56} alt="Engagement icon" />
            <h2 className="text-2xl font-bold text-white">Direct Fan Engagement</h2>
          </div>
          <hr className="w-full border-t border-white/20" />
          <p className="text-lg text-gray-400">
            Connect with your audience through comments, likes, and exclusive content, fostering a loyal fanbase.
          </p>
        </div>
      </div>

      {/* Innovative Monetization Card */}
      <div className="order-3 bg-[#140425] rounded-lg border border-gray-700 p-10 hover:shadow-lg hover:-translate-y-1 transition-transform">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center">
            <Image src={Wallet} width={56} height={56} alt="Wallet icon" />
            <h2 className="text-2xl font-bold text-white">Innovative Monetization</h2>
          </div>
          <hr className="w-full border-t border-white/20" />
          <p className="text-lg text-gray-400">
            Leverage NFTs and blockchain technology to offer unique experiences and products to your fans.
          </p>
        </div>
      </div>
    </div>

  </div>
);

const ForCreatives = () => {
  return (
    <section
      id="for-creators"
      className="sm:mt-8 sm:mb-8 lg:mt-0 lg:mb-0 2xl:translate-y-[70px] px-5 sm:px-10 lg:px-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 translate-y-[100px] lg:translate-y-[10px] 2xl:translate-y-[-80px] max-w-screen-xl mx-auto">
        {/* Left Column */}
        <div className="flex flex-col justify-start gap-8 2xl:translate-x-[-170px] lg:translate-x-[40px] 2xl:translate-y-[100px] lg:translate-y-[-100px]">
          <h2 className="text-[2rem] xl:text-[3rem] leading-[110%] font-bold max-w-[635px]">
            <span className="sm:inline text-[#E22BCC]">Empowering </span> Creatives to Thrive
          </h2>

          <div className="h-[0.5px] w-full max-w-[90%] sm:max-w-screen-lg bg-[#8A8AA0] bg-opacity-40 mb-5 mx-auto"></div>


          {/* Icon + Text Blocks */}
          <div className="flex items-center gap-4"> {/* Adjusted gap */}
            <Image src={ArtistIcon} alt="Artist" className="w-10 h-10" width={40} height={40} /> {/* Increased icon size, added width/height */}
            <div className="text-lg">Share Creativity, Gain Recognition</div> {/* Improved text style */}
          </div>

          <div className="flex items-center gap-4"> {/* Adjusted gap */}
            <Image src={StockMarket} alt="Stock Market" className="w-10 h-10" width={40} height={40} /> {/* Increased icon size, added width/height */}
            <div className="text-lg">Sell Directly, Keep Earnings.</div> {/* Improved text style */}
          </div>

          <div className="flex items-center gap-4"> {/* Adjusted gap */}
            <Image src={AurallyFoster} alt="Aurally Foster" className="w-10 h-10" width={40} height={40} /> {/* Increased icon size, added width/height */}
            <div className="text-lg">Connect, Engage, Build Community</div> {/* Improved text style */}
          </div>
        </div>

        {/* Right Column */}
        <div className="relative h-[400px] lg:h-[700px] 2xl:h-[700px] lg:h-auto 2xl:translate-y-[-100px] lg:translate-y-[-100px]"> {/* Adjusted height */}
          <Image
            src="/images/empowered artist 1.svg"
            alt="Empowered Artist"
            fill
            style={{ objectFit: "contain" }} // Use style instead of className for objectFit
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"  // Add sizes for optimization
          />
        </div>
      </div>

      <HeroText />
    </section>
  );
};

export default ForCreatives;