import React from "react";
import Image from "next/image";
import BallGradient from "@components/BallGradient";

const AboutUs = () => {
  return (
    <section className="grid md:grid-cols-2 xl:gap-20">
      <div className="relative">
        <BallGradient topOrBottom="top-[-25%]" leftOrRight="left-[-50%]" />
        <div className="relative">
          <div className="pb-4 mb-5 border-b border-borderColor" id="about">
            Welcome to Aurally:
          </div>
          <h1 className="text-[3.5rem] xl:text-[5rem] leading-[110%] font-bold max-w-[600px] lg:max-w-[500px] xl:max-w-[635px]">
            <span className={"text-yellow"}>No1 NFT marketplace</span>{" "}
            for creatives and fans
          </h1>
          <div className="font-roboto mt-3">
            At Aurally, we believe in the power of creativity to inspire,
            connect, and transform. We&apos;re on a mission to empower creatives
            to share their talent with the world while connecting fans with
            authentic and meaningful experiences. Join us on a journey where art
            meets innovation, with limitless possibilities.
          </div>
        </div>
      </div>
      <div className="relative hidden md:flex items-center" id="about ">
        <BallGradient topOrBottom="bottom-0" leftOrRight="right-0" />
        <Image
          width={594}
          height={376}
          src="/images/listening_to_music.svg"
          alt="lady listening to music"
          className="relative"
        />
      </div>
    </section>
  );
};

export default AboutUs;
