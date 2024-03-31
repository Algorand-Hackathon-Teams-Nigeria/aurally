import React from "react";
import Image from "next/image";
import classes from "../../styles/landing.module.css";
import Link from "next/link";
import heroImage from "../../assets/heroImage.png";

const HeroSection = () => {
  return (
    <section
      className={`${classes.herosection} w-full h-max lg:min-h-[100vh] lg:flex items-end overflow-hidden bg-[#8A2BE2]/70`}
      id="home"
    >
      <div className="lg:min-h-[87lvh] flex items-center justify-center px-[4.5%] md:px-0">
        <div className="relative z-[1] lg:right-[-20%] text-center lg:text-start pt-40 pb-0 lg:pb-24">
          <h1 className="text-[3.5rem] xl:text-[5rem] leading-[110%] font-bold max-w-[600px] lg:max-w-[500px] xl:max-w-[635px]">
            Discover, <span className={"text-[#E22BCC]"}>Stream</span>{" "}
            and collect the <span className={classes.txt_grd}>Rarest NFTs</span>
          </h1>
          <Link
            title="Marketplace"
            href="https://app.aurally.xyz/explore"
            target="_blank"
            className={`${classes.getBtn} flex w-[163px] mt-8 lg:mt-12 mx-auto lg:mx-0`}
          >
            Explore
          </Link>
        </div>
      </div>
      <Image
        src={heroImage}
        alt=""
        className="lg:hidden mx-auto max-h-[100vw] bg-contain bg-bottom"
        priority
      />
    </section>
  );
};

export default HeroSection;
