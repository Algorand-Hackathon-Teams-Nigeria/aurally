import React from "react";
import InfiniteCarousel from "@ui/newcarousel";

const SupportText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = (
    <>
      <span className="block max-w-screen-lg 2xl:translate-x-[170px] lg:translate-x-[170px]">
        Aurally&apos;s Web3 platform guarantees artists a bigger share of
      </span>
      <span className="block max-w-screen-lg 2xl:translate-x-[170px] lg:translate-x-[170px]">
        With seamless Web3 payment options, including popular cryptocurrencies, you can back
      </span>
      <span className="block max-w-screen-lg 2xl:translate-x-[170px] lg:translate-x-[170px]">
        creators from all around the globe. Empower your connection to music and creativity in a
      </span>
      <span className="block max-w-screen-lg 2xl:translate-x-[170px] lg:translate-x-[170px]">
        way that&apos;s truly yours.
      </span>
    </>
  ),
}) => (
  <div className="hero-text-container mt-[200px] px-5 sm:px-10 lg:px-0">
    <div className="ml-[-7px] max-w-screen-xl mx-auto">
      <h1 className="leading-[110%] font-bold text-4xl max-w-[635px] max-w-screen-lg 2xl:translate-x-[170px] lg:translate-x-[170px]">
        Support Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E22BCC] to-[#FBB03B]">
          Faves,
        </span>
        <span className="block">Your Way.</span>
      </h1>
      <p className="hero-subtitle mt-2">{subtitle}</p>
    </div>

    <div className="mt-6 w-screen overflow-hidden pointer-events-none">
      <InfiniteCarousel />
    </div>
  </div>
);

export default SupportText;
