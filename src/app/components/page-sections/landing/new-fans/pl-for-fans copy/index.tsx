"use client";

import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";

// Dynamically importing EmblaCarousel for lazy loading
const EmblaCarousel = dynamic(() => import("@ui/EmblaCarousel"), {
  ssr: false,
});

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Connect Directly with your favourite artists",
}) => (
  <div className="hero-text-container sm:ml-40 text-center sm:text-left lg:translate-y-[240px] mx-auto ">
    <h1 className="leading-[110%] font-bold text-4xl sm:text-4xl max-w-[635px] mx-auto sm:mx-0 sm:mt-[-400px] translate-y-[-50px] lg:translate-x-0 translate-x-[10px]">
      <span className="">Discover, </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E22BCC] to-[#FBB03B]">
        Stream
      </span>
      <span className="block sm:inline">
        {" "}
        and collect the{" "}
        <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[#E22BCC] to-[#FBB03B]">
          Rarest NFTs
        </span>
      </span>
    </h1>
    <p className="hero-subtitle mt-2 mx-auto sm:mx-0 translate-y-[-50px] lg:translate-x-0 translate-x-[10px]">
      {subtitle}
    </p>
  </div>
);

const HeroButtons = ({
  onGetStarted = () => console.log("Get Started clicked"),
  onExplore = () => console.log("Explore clicked"),
}) => (
  <div className="flex flex-col gap-2.5 mt-8 sm:ml-40 ml-0 sm:mr-0 mr-4 w-full max-w-[500px] mx-auto lg:translate-y-[420px] 2xl:translate-y-[450px] translate-y-[-50px]">
    <div className="flex gap-2.5 justify-center">
      <button
        className="flex items-center justify-center px-4 py-3 bg-[#8a2be2] text-white text-base font-bold rounded-full min-w-[128px] transition-all duration-300 ease-in-out hover:bg-[#7825c2]"
        onClick={() => {
          window.location.href = "https://app.aurally.xyz";
        }}
      >
        <span>Get Started</span>
      </button>

      <button
        className="flex items-center justify-center px-4 py-3 border border-[#c6c6c6] text-[#c6c6c6] text-base font-bold rounded-full min-w-[121px] transition-all duration-300 ease-in-out hover:border-[#8a2be2] hover:text-[#8a2be2]"
        onClick={() =>
          (window.location.href = "https://app.aurally.xyz/explore")
        }
      >
        <span>Explore</span>
      </button>
    </div>
  </div>
);

const HomePage = () => (
  <div className="h-screen">
    <Head>
      <title>Aurally - Discover, Stream, Collect NFTs</title>
      <meta
        name="description"
        content="Connect Directly with your favorite artists."
      />
      <link rel="preload" href="/Black & White 1 1.png" as="image" />
      <link rel="preload" href="/landing_background 1.png" as="image" />
      <link rel="preload" href="/mobile-background.png" as="image" />
      <link rel="preload" href="/images/hero phone image 1.svg" as="image" />
    </Head>
    <main
      className="grid grid-cols-12 gap-8 px-4 pt-16 sm:pt-[100px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/Black & White 1 1.png')",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-start">
        <HeroText />
        <div className="flex sm:hidden mt-4 w-full">
          <HeroButtons />
        </div>
        <div className="hidden sm:flex mt-4 lg:translate-y-[-250px]">
          <HeroButtons />
        </div>
      </div>

      <div
        className="col-span-12 sm:col-span-6 flex justify-center items-center sm:mt-[-60px] mt-[20px] sm:mb-16 relative lg:translate-y-[60px] 2xl:translate-y-[60px] 2xl:translate-x-[30px] translate-y-[-27px] translate-x-[10px] w-full pointer-events-none"
      >
        <Image
          src="/landing_background 1.png"
          alt="Background"
          fill
          className="object-cover pointer-events-none"
          priority 
        />

       
        <Image
          src="/images/hero phone image 1.svg"
          alt="Phone Mockup"
          width={300}
          height={600}
          className="w-80 md:w-96 lg:w-full max-h-[50vh] md:max-h-[55vh] lg:max-h-[60vh] xl:max-h-[85vh] 2xl:max-h-[70vh] 4xl:max-h-[30vh] object-contain z-10 pointer-events-none"
          priority 
        />

        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{ zIndex: 0 }}
        >
          <div className="sm:hidden opacity-40 pointer-events-none">
            <EmblaCarousel />
          </div>
          <div className="hidden sm:flex opacity-30 2xl:translate-x-[-390px] pointer-events-none">
            <EmblaCarousel />
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default HomePage;