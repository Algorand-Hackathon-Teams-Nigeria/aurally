import SideBar from "./component/SideBar";
import classes from "./styles/landing.module.css";
import SvgOne from "./component/SvgOne";
import HomeMarketPlace from "./home-sections/HomeMarketPlace";
import Link from "next/link";
import Image from "next/image";
import algorand from "./assets/Algorand.png";
import ashinity from "./assets/ashinity.svg";
import chat from "./assets/chat-circle.svg";
import { BigLogo } from "./component/BigLogo";
import { Icon } from "./component/Icon";
import { getArtAndSoundData } from "@/utils/queries";
import { Suspense } from "react";
import { NftCarouselLoader } from "./home-sections/HomeMarketPlace/NftCarousel";
import { TYPES, features, roadmaps, works } from "./data";


type PageProp = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function LandingPage({ searchParams }: PageProp) {
  const nft_promise = getArtAndSoundData();
  const type = searchParams.type || "all";
  return (
    <main
      className={`${classes.landing} max-h-screen font-space overflow-y-auto px-[4.5%] bg-pageGrad relative`}
    >
      <div className="absolute inset-0">
        <Image
          src={"/Group.png"}
          className="w-full h-max"
          width={1551}
          height={1700}
          alt=""
        />
      </div>
      <div className="max-w-6xl mx-auto">
        {/* NavBar */}
        <nav className="pt-6 pb-3 flex justify-between items-center">
          <BigLogo to="/" className="w-28 lg:w-max" />
          <div className="hidden lg:flex gap-14">
            <Link href="/">Home</Link>
            <a href="#features">Features</a>
            <a href="#works">How it works</a>
            <a href="#road">Roadmap</a>
          </div>
          <SideBar />
          <Link
            href="https://dapp.aurally.xyz"
            className={`${classes.getBtn} hidden lg:flex`}
          >
            Launch App
          </Link>
        </nav>
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl xl:text-[4rem] font-bold">
            Discover, <span className={classes.txt_grd}>Stream</span> and
            collect the <span className={classes.txt_grd}>Rarest Nfts</span>
          </h1>
          <div className="text-sm min-[420px]:text-base md:text-lg xl:text-xl mt-7">
            The No 1. NFT Marketplace.
          </div>
          <Link
            href="https://dapp.aurally.xyz"
            className={`${classes.getBtn} flex max-w-[163px] mt-12 mx-auto`}
          >
            Get Started
          </Link>
        </div>
        {/* Partner */}
        <div className="overflow-x-auto mt-32 mb-40" id="partners">
          <div className="mx-auto w-max flex justify-center gap-16">
            <div className="flex items-center gap-4">
              <Image src={algorand} alt="partner" />
              <div className="text-3xl font-bold">Algorand</div>
            </div>
            <Image src={ashinity} className=" scale-75" alt="partner" />
          </div>
        </div>
        {/* Features */}
        <div
          className="rounded-[20px] bg-[#111] border border-primary px-[5%] sm:px-9 py-12 sm:py-16 mb-28"
          id="features"
        >
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold">
            Features
          </h2>
          <div className="grid md:grid-cols-2 mt-8 sm:mt-14">
            {features.map(({ title, icon, desc }, index) => (
              <div
                key={index}
                className=" md:odd:border-r border-primary pb-12 md:odd:pr-6 md:even:pl-4 lg:odd:pr-16 lg:even:pl-16 flex gap-4 items-center sm:items-start"
              >
                {index === 3 ? (
                  <Image
                    alt="features"
                    src={chat}
                    className="max-w-[11.5vw] sm:max-w-[5rem] lg:max-w-[6.2rem] h-max"
                  />
                ) : (
                  <Icon
                    icon={icon}
                    className="text-[12.5vw] sm:text-[5rem] lg:text-[6.5rem] text-primary shrink-0"
                  />
                )}
                <div>
                  <div className="text-lg md:text-xl lg:text-2xl mb-7 font-bold">
                    {title}
                  </div>
                  <div className="text-xs md:text-sm leading-normal">
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* MarketPlace */}
        <div>
          <div className="flex justify-between items-center">
            <div className="text-3xl md:text-4xl font-bold mb-6 mt-6">
              Marketplace
            </div>
            <Link href={"/dapp/marketplace"} className="text-[#8A2BE2]">
              see all
            </Link>
          </div>
          <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
            {TYPES.map((item) => (
              <Link
                scroll={false}
                href={{ pathname: "/", query: { type: item.value } }}
                key={item.label}
                className={`px-4 h-9 grid place-items-center rounded-full border border-primary ${
                  type === item.value ? "bg-primary" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Suspense fallback={<NftCarouselLoader />}>
            <HomeMarketPlace type={type as string} nfts={nft_promise} />
          </Suspense>
          <Link
            href="/dapp/marketplace"
            className={`${classes.getBtn} flex w-max mx-auto mt-20`}
          >
            Explore Marketplace
          </Link>
        </div>
        {/* How it Works */}
        <div className="flex flex-col items-center my-36" id="works">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold">
            How it works
          </h2>
          <div className="text-center sm:text-lg md:text-xl max-w-[934px] mt-6 mb-14">
            Immerse yourself in the world of digital creativity like never
            before. Here is a step on how our platform works
          </div>
          <div className="grid md:grid-cols-2 mt-8 gap-12 lg:gap-16">
            {works.map(({ title, icon, desc }, index) => (
              <div key={index} className="flex sm:gap-2 lg:gap-4">
                <SvgOne num={index + 1} />
                <div className="flex-1 rounded-[10px] border border-primary py-6 px-4">
                  <Icon icon={icon} className="text-[4rem] text-primary" />
                  <div className="text-lg md:text-xl lg:text-2xl mt-4 mb-7">
                    {title}
                  </div>
                  <div className="text-xs md:text-sm leading-normal">
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Roadmap */}
        <div className="mb-36" id="road">
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold mb-10">
            Roadmap
          </h2>
          <div className="hidden md:block">
            <div className="grid grid-cols-roadmap items-center">
              <div className="pt-14" />
              <div
                className={`h-full bg-primary relative ${classes.roadmap_top}`}
              />
            </div>
            {roadmaps.map(({ title, desc }, index) => (
              <div key={index} className="grid grid-cols-roadmap items-center">
                {index % 2 !== 0 && (
                  <>
                    <div />
                    <div className="h-full bg-primary relative" />
                  </>
                )}
                <div>
                  <div
                    className={`flex gap-5 ${
                      index % 2 !== 0 ? "justify-start" : "justify-end"
                    }`}
                  >
                    {index % 2 !== 0 && <div className={classes.arrow_left} />}
                    <div className="flex items-center">
                      {index % 2 === 0 && (
                        <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-l-full grid place-items-center shrink-0">
                          <span className=" text-2xl lg:text-3xl font-bold -mr-1">
                            {index + 1}
                          </span>
                        </div>
                      )}
                      <div className="border border-borderColor p-4 rounded-[10px] max-w-[420px]">
                        <div className="font-bold mb-4">{title}</div>
                        <ul className="text-[13px] font-medium space-y-3 purple-disc list-disc marker:text-primary">
                          {desc.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      {index % 2 !== 0 && (
                        <div className="bg-primary w-10 h-10 lg:w-12 lg:h-12 rounded-r-full grid place-items-center shrink-0">
                          <span className=" text-2xl lg:text-3xl font-bold -ml-1">
                            {index + 1}
                          </span>
                        </div>
                      )}
                    </div>
                    {index % 2 === 0 && <div className={classes.arrow_left} />}
                  </div>
                </div>
                {index % 2 === 0 && (
                  <>
                    <div className="h-full bg-primary relative" />
                    <div />
                  </>
                )}
              </div>
            ))}
            <div className="grid grid-cols-roadmap items-center">
              <div className="pb-14" />
              <div
                className={`h-full bg-primary relative ${classes.roadmap_bottom}`}
              />
            </div>
          </div>
          <div className="w-full grid md:hidden grid-cols-roadmap-sm items-center pt-12">
            <div className="h-[calc(100%+80px)] bg-primary roadmap relative" />
            <div className="w-full space-y-8">
              {roadmaps.map(({ title, desc }, index) => (
                <div key={index} className="flex gap-3 justify-start">
                  <div className="bg-primary h-7 w-7 sm:w-8 sm:h-8 lg:w-12 lg:h-12 rounded-r-full grid place-items-center shrink-0">
                    <span className=" sm:text-xl lg:text-3xl font-bold -ml-1">
                      {index + 1}
                    </span>
                  </div>
                  <div className="border border-borderColor p-4 rounded-[10px] max-w-[420px]">
                    <div className="font-bold mb-4">{title}</div>
                    <ul className="text-xs font-medium space-y-2">
                      {desc.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* community */}
        <div className="bg-primary rounded-3xl py-[70px] px-4 overflow-hidden relative">
          <div className=" absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#6500764D]" />
          <div className=" absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#6500764D]" />
          <div className=" relative">
            <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-center mb-9">
              Join Our Community
            </div>
            <Link
              href="/dapp"
              className="w-max block px-8 py-4 rounded-[40px] bg-white text-[#1C51FE] mx-auto"
            >
              Get Started
            </Link>
          </div>
          <div />
        </div>
        {/* Footer */}
        <div className="mt-32">
          <div className="w-max mx-auto mb-12">
            <BigLogo to="#" />
            <div className="flex gap-5 mt-10">
              <div className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
                <Icon icon="ic:round-facebook" color="white" fontSize={22} />
              </div>
              <div className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
                <Icon icon="mdi:twitter" color="white" fontSize={22} />
              </div>
              <div className="h-10 w-10 rounded-[10px] bg-[#3434444D] grid place-items-center">
                <Icon icon="ic:baseline-discord" color="white" fontSize={22} />
              </div>
            </div>
          </div>
          <div className="h-[0.5px] w-full bg-[#8A8AA0] mb-5" />
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-between mb-16 sm:mb-28">
            <div>© 2023 Aurally All rights reserved</div>
            <div>Terms & Conditions</div>
          </div>
        </div>
      </div>
    </main>
  );
}
