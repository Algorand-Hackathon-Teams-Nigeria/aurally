import React from "react";
import Image from "next/image";
import BallGradient from "@components/BallGradient";

const AboutUsNew = () => {
  return (
    <section
      className="grid md:grid-cols-2 xl:gap-20 h-full sm:h-[500px] md:h-[550px] lg:h-[600px] px-5 sm:px-10 lg:px-0"
      style={{
        backgroundImage: "url('/aboutbg%201.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "700px",
        width: "100%",
      }}
    >
      <div className="relative 2xl:translate-x-[170px] lg:translate-x-[170px] max-w-screen-lg mx-auto">
        <BallGradient topOrBottom="top-[-25%]" leftOrRight="left-[-50%]" />
        <div className="relative">
          <div className="pb-4 mb-5 border-b border-borderColor" id="about">
            Welcome to Aurally:
          </div>
          <h1 className="text-[3rem] xl:text-[4rem] leading-[110%] font-bold max-w-[600px] lg:max-w-[500px] xl:max-w-[635px]">
            <span className="font-space-grotesk text-[64px] font-bold leading-[100%] tracking-[-0.25px] text-[#c6c6c6]">
              More For Fans
            </span>{" "}
            <Image
              src="/About us content.png"
              alt="More For Creatives"
              className="mt-4 transform pointer-events-none"
              width={500}
              height={150}
              priority
            />
          </h1>
          <div className="font-roboto mt-3 text-lg md:text-2xl max-w-[50ch] md:max-w-[65ch] lg:max-w-[80ch] xl:max-w-[60ch] break-words whitespace-normal">
            Aurally is the leading Web3 platform for streaming music online, watching high-quality videos, earning crypto, collecting and minting NFTs, and using your creativity to create endless possibilities.
          </div>

          <button className="mt-6 flex items-center justify-center bg-[#8a2be2] rounded-full px-5 py-3 cursor-pointer transition-transform duration-300 hover:scale-105">
            <Image
              src="/Frame_btn.png"
              alt="Launch App Button"
              className="w-full h-full"
              width={150}
              height={50}
            />
          </button>
        </div>
      </div>

      <div
  className="relative hidden md:flex items-center 2xl:translate-x-[200px] 2xl:translate-y-[-150px] lg:translate-x-[170px] lg:translate-y-[-150px]"
  id="about"
>
  <BallGradient topOrBottom="bottom-0" leftOrRight="right-0" />
  <Image
    src="/Group 1000002693.png"
    alt="Group Image"
    className="w-[450px] h-auto pointer-events-none"
    width={450}
    height={300}
  />
</div>

    </section>
  );
};

export default AboutUsNew;
