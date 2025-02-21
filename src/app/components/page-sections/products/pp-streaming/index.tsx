"use client";
import React from "react";
import Image from "next/image";
import { Carousel, Card } from "@/app/components/ui/apple-cards-carousel";
import ProductPromotion from "@atoms/a-product-promotion";
import MusicVideoStreaming from './MusicVideoStreaming';

const HeroText = ({
  mainTitle = "Discover, Stream and collect the Rarest NFTs",
  subtitle = "Aurally empowers artists to share their music, earn"
}) => (
  <div className="container mx-auto px-4">
    <div className="flex flex-col justify-center items-start gap-6 pr-4 sm:pr-16 sm:translate-x-[-30px] w-full">
      <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-5xl lg:text-6xl font-bold text-transparent bg-clip-text mb-4">
        Products
      </h2>
      <p className="text-lg text-gray-300">
        Explore a wide range of services, including Music/Video Streaming, Stream to Earn, Fractional NFTs, P2P Exchange, and Aurally DAO,
        all seamlessly integrated into one platform. Enjoy community-driven governance, decentralized decision-making, and innovative ways to engage
        with digital content, all while earning rewards and securely managing your assets.
      </p>
    </div>
  </div>
);

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => (
        <div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
            Langotiya jeetu ka mara hua yaar is ready to capture every thought.
          </p>
          <Image
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            width={500}
            height={500}
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            priority 
          />
        </div>
      ))}
    </>
  );
};

const data = [
  {
    category: (
      <Image
        src="/images/Frame_1000008356.svg"
        alt="Music Streaming"
        width={200}
        height={200}
        style={{ height: "auto", userSelect: "none", pointerEvents: "none" }}
        priority 
      />
    ),
    title: (
      <p className="truncate-lines-3 text-gray-300 text-base leading-relaxed sm:text-sm">
        Connect your digital wallet to our multi-blockchain platform for secure NFT access and transactions. Enjoy seamless compatibility with popular cryptocurrencies.
      </p>
    ),
    src: "https://aurally-images.s3.eu-west-3.amazonaws.com/Mask_group1.svg",
  },
  {
    category: (
      <Image
        src="/images/Frame_1000008356(1).svg"
        alt="Stream to Earn"
        width={200}
        height={200}
        style={{ height: "auto", userSelect: "none", pointerEvents: "none" }}
        priority 
      />
    ),
    title: (
      <p className="truncate-lines-3 text-gray-300 text-base leading-relaxed sm:text-sm">
        Connect your digital wallet to our multi-blockchain platform for secure, seamless access to NFTs and popular cryptocurrencies.
      </p>
    ),
    src: "https://aurally-images.s3.eu-west-3.amazonaws.com/Mask_group2.svg",
  },
  {
    category: (
      <Image
        src="/images/Frame_1000008356(2).svg"
        alt="Fractional Nfts"
        width={200}
        height={200}
        style={{ height: "auto", userSelect: "none", pointerEvents: "none" }}
        priority 
      />
    ),
    title: (
      <ul className="text-gray-300 text-base leading-relaxed list-disc pl-5">
        <li>Royalty Split</li>
        <li>Public GoFundMe</li>
        <li>Private GoFundMe</li>
      </ul>
    ),
    src: "https://aurally-images.s3.eu-west-3.amazonaws.com/Mask_group3.svg",
  },
  {
    category: (
      <Image
        src="/images/Frame_1000008356(3).svg"
        alt="P2P exchange"
        width={200}
        height={200}
        style={{ height: "auto", userSelect: "none", pointerEvents: "none" }}
        priority 
      />
    ),
    title: (
      <p className="truncate-lines-3 text-gray-300 text-base leading-relaxed sm:text-sm">
        Connect your wallet to our multi-blockchain platform for secure, seamless access to NFTs and popular cryptocurrencies.
      </p>
    ),
    src: "https://aurally-images.s3.eu-west-3.amazonaws.com/Mask_group5.svg",
  },
  {
    category: (
      <Image
        src="/images/Frame_1000008356(4).svg"
        alt="Aurally Dao"
        width={200}
        height={200}
        style={{ height: "auto", userSelect: "none", pointerEvents: "none" }}
        priority 
      />
    ),
    title: (
      <p className="truncate-lines-3 text-gray-300 text-base leading-relaxed sm:text-sm">
        Join our DAO governance for community-driven decisions and connect your wallet to our multi-blockchain platform, ensuring secure access to NFTs and popular cryptocurrencies.
      </p>
    ),
    src: "https://aurally-images.s3.eu-west-3.amazonaws.com/Mask_group4.svg",
  },
];

const Streaming = () => {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full h-full py-20">
      <div className="col-span-12 sm:col-span-6 flex flex-col justify-center items-start">
        <HeroText />
      </div>
      <Carousel items={cards} />
    </section>
  );
};

export default Streaming;