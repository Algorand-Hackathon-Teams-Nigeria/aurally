import React from "react";
import Image from "next/image";
import BallGradient from "@components/BallGradient";

const AboutUsCreatives = () => {
  return (
    <section className="grid md:grid-cols-2 xl:gap-20 h-[650px] sm:h-[900px] md:h-[550px] lg:h-[600px] lg:translate-y-[0px] translate-y-[-100px] lg:translate-x-[0px] translate-x-[0px]">
      <div className="relative 2xl:translate-x-[-120px]">
        <BallGradient topOrBottom="top-[-25%]" leftOrRight="left-[-50%]" />
        <div className="relative 2xl:translate-x-[-100px] lg:translate-x-[0px]">
          <div className="pb-4 mb-5 text-yellow" id="about">
            Welcome to Aurally:
          </div>
          <h1 className="text-[3.5rem] xl:text-[5rem] leading-[110%] font-bold max-w-[600px] lg:max-w-[500px] xl:max-w-[635px]">
            <span className="font-space-grotesk text-[64px] font-bold leading-[100%] tracking-[-0.25px] text-[#c6c6c6] m-0">
              Earn <span className=" sm:inline text-yellow">More </span> from
            </span>{" "}
            <span className="font-space-grotesk text-[64px] font-bold leading-[100%] tracking-[-0.25px] text-[#c6c6c6] m-0">Your Music</span>
          </h1>
          <div className="font-roboto mt-3">
            <span className=" sm:inline">Aurally&apos;s Web3 platform guarantees artists a bigger share of{" "} </span>
            <span className=" sm:inline">{" "}revenue, redefining music streaming profits.</span>
          </div>
          <button className="mt-6 flex items-center justify-center bg-[#8a2be2] rounded-full px-5 py-3 cursor-pointer transition-transform duration-300 hover:scale-105">
            <Image
              src="/Frame_btn.png"
              alt="Launch App Button"
              width={3000}   
              height={100}  
              className="w-full h-full"
            />
          </button>
        </div>
      </div>
      <div
        className="relative flex items-center justify-center sm:static lg:translate-y-[-80px]"
        id="about"
      >
        <BallGradient topOrBottom="bottom-0" leftOrRight="right-0" />
        <Image
          src="/images/guy with guitar.svg"
          alt="Group Image"
          width={500}   
          height={600}  
          className="absolute sm:relative transform sm:ml-5 sm:mb-50 sm:translate-x-0 sm:translate-y-0 -translate-x-[80px] translate-y-[50px] w-[500px] sm:w-[450px] h-auto"
        />
      </div>
    </section>
  );
};

export default AboutUsCreatives;