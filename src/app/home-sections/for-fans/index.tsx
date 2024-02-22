import React from "react";
import ForFansHero from "../../assets/FOR-FANS.png";
import Image from "next/image";
import StockMarket from "../../assets/icon-park-outline_stock-market.png";
import ArtistIcon from "../../assets/material-symbols-light_artist-outline.png";
import AurallyFoster from "../../assets/material-symbols-light_artist-outline-1.png";
import BallGradient from "@/app/component/BallGradient";

const ForFans = () => {
  return (
    <div>
      <Image src={ForFansHero} alt="" id="fans" className="mb-14" />
      <div className="grid lg:grid-cols-2 justify-between relative">
        <BallGradient topOrBottom="top-0" leftOrRight="right-0" />
        <h1 className="text-[3.5rem] xl:text-[5rem] leading-[110%] font-bold max-w-[635px]">
          Discover New Sounds, Connect with your faves.
        </h1>
        <div className="overflow-x-scroll">
          <div className="grid grid-cols-landing-card-1 lg:grid-cols-1 gap-4 font-roboto mt-8 lg:mt-0">
            <div className="flex items-center gap-2 h-full">
              <Image
                src={ArtistIcon}
                alt=""
                className="w-16 h-16 hidden lg:block"
              />
              <div className="rounded-[10px] border border-primary p-5 h-full">
                Aurally offers fans a curated selection of music from emerging
                and established artists across genres.
              </div>
            </div>
            <div className="flex items-center gap-2 h-full">
              <Image
                src={StockMarket}
                alt=""
                className="w-16 h-16 hidden lg:block"
              />
              <div className="rounded-[10px] border border-primary p-5 h-full">
                With Aurally&apos;s Stream-to-Earn feature, every stream,
                engagement, and purchase becomes an opportunity for rewards.
                Loyal fans are now incentivized for indulging in what they love,
                creating a symbiotic relationship between creatives and their
                supporters.
              </div>
            </div>
            <div className="flex items-center gap-2 flex-1 h-full">
              <Image
                src={AurallyFoster}
                alt=""
                className="w-16 h-16 hidden lg:block"
              />
              <div className="rounded-[10px] border border-primary p-5 h-full">
                Fans can interact with artists through comments, likes, and get
                exclusive access to behind-the-scenes content, live streams, and
                virtual events featuring their favorite artists.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForFans;
