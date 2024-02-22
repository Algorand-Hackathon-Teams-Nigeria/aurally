import React from "react";
import ForCreatorsHero from "../../assets/FOR-CREATORS.png";
import Image from "next/image";
import StockMarket from "../../assets/icon-park-outline_stock-market.png";
import ArtistIcon from "../../assets/material-symbols-light_artist-outline.png";
import AurallyFoster from "../../assets/material-symbols-light_artist-outline-1.png";
import BallGradient from "@/app/component/BallGradient";

const ForCreators = () => {
  return (
    <div>
      <Image src={ForCreatorsHero} alt="" id="creators" className="mb-14" />
      <div className="grid lg:grid-cols-2 justify-between relative">
        <BallGradient topOrBottom="top-0" leftOrRight="right-0" />
        <h1 className="text-[3.5rem] xl:text-[5rem] leading-[110%] font-bold max-w-[635px] relative">
          Empowering Creatives to Thrive
        </h1>
        <div className="overflow-x-scroll relative">
          <div className="grid grid-cols-landing-card-1 lg:grid-cols-1 gap-4 font-roboto mt-8 lg:mt-0">
            <div className="flex items-center gap-2 h-full">
              <Image
                src={ArtistIcon}
                alt=""
                className="w-16 h-16 hidden lg:block"
              />
              <div className="rounded-[10px] border border-primary p-5 h-full">
                Whether it&apos;s music, visual art, or other forms of
                creativity, Aurally offers a platform for creatives to share
                their work and gain recognition.
              </div>
            </div>
            <div className="flex items-center gap-2 h-full">
              <Image
                src={StockMarket}
                alt=""
                className="w-16 h-16 hidden lg:block"
              />
              <div className="rounded-[10px] border border-primary p-5 h-full">
                Aurally&apos;s decentralized marketplace model allows creatives
                to sell their music, artwork, and creative content directly to
                fans and collectors. This eliminates intermediaries and ensures
                that creatives retain control over their work and earnings.
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1 h-full">
              <Image
                src={AurallyFoster}
                alt=""
                className="w-16 h-16 hidden lg:block"
              />
              <div className="rounded-[10px] border border-primary p-5 h-full">
                Aurally fosters a vibrant and engaged community of artists,
                creators, and industry professionals. Through features like
                comments, likes, and shares, artists can connect with their
                audience, receive feedback, and build a loyal fan base.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForCreators;
