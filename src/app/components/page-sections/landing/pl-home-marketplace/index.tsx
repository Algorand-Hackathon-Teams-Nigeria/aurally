/* "use client";
import Link from "next/link";
import { Button } from "@mantine/core";
import classes from "@styles/landing.module.css";
import BallGradient from "@components/BallGradient";
import { useGetNftsQuery } from "@services/graphl_generated";
import { NftCarousel, NftCarouselLoader } from "@molecules/m-nft-carousel";

const HomeMarketPlace = () => {
  const { data, loading } = useGetNftsQuery();

  return (
    <section id="marketplace" className="relative">
      <BallGradient topOrBottom="top-40" leftOrRight="left-[calc(-9vw)]" />
      <BallGradient
        topOrBottom="bottom-[-125%]"
        leftOrRight="right-[calc(-9vw-50px)]"
      />
      <div className="">
        <div className="flex justify-between items-center  mt-14 mb-6">
          <div className="text-3xl md:text-4xl font-bold">Marketplace</div>
        </div>
        <div className="flex gap-4 mb-4 w-full h-[42px] overflow-x-auto">
          <Button variant={"filled"} radius="xl">
            Music
          </Button>
        </div>
        {loading
          ? <NftCarouselLoader />
          : <NftCarousel data={data?.soundNfts} />}
        <Link
          title="Marketplace"
          href="https://app.aurally.xyz/explore"
          target="_blank"
          className={`${classes.getBtn} flex w-max mx-auto mt-20`}
        >
          Explore Marketplace
        </Link>
      </div>
    </section>
  );
};

export default HomeMarketPlace; */



'use client';

import React, { useState } from 'react';

const HomeMarketPlace: React.FC = () => {
  // MarketplaceHeader
  const MarketplaceHeader: React.FC = () => {
    return (
      <div className="flex justify-between items-center w-full min-w-[300px] h-[44px] px-4 box-border">
        <h1 className="m-0 font-spaceGrotesk text-3xl font-bold leading-[44px] text-white">
          Marketplace
        </h1>
        <div className="flex gap-6 items-center">
          <button
            className="w-[34px] h-[34px] p-0 border-none bg-transparent cursor-pointer transition-transform duration-200"
            onClick={() => handlePrev()}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/arrow-ci.png"
              alt="Previous"
              className="w-full h-full"
            />
          </button>
          <button
            className="w-[34px] h-[34px] p-0 border-none bg-transparent cursor-pointer transition-transform duration-200"
            onClick={() => handleNext()}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src="https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/arrow-ci-2.png"
              alt="Next"
              className="w-full h-full"
            />
          </button>
        </div>
      </div>
    );
  };

  // CategoryFilters
  const CategoryFilters: React.FC<{ onCategoryChange?: (category: string) => void }> = ({ onCategoryChange }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const categories = ['All', 'Music', 'Art', 'Videos'];

    const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
      if (onCategoryChange) onCategoryChange(category);
    };

    return (
      <div className="flex gap-4 items-center justify-start w-full h-[32px]">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-3 py-2 rounded-full text-white font-semibold text-sm uppercase transition-all duration-300 min-w-[47px] h-[32px] ${
              category === selectedCategory
                ? 'bg-[#8a2be2] border-none'
                : 'border border-[#8a2be2] bg-transparent hover:bg-[#8a2be2]/10'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };

  // ProductCard
  const ProductCard: React.FC<{
    image?: string;
    title?: string;
    creator?: string;
    price?: string;
    creatorImage?: string;
  }> = ({
    image = 'https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/frame-19.png',
    title = 'Beat the flow',
    creator = 'Tyler Faye',
    price = '0.25 ETH',
    creatorImage = 'https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/ellipse.png',
  }) => {
    return (
      <div className="max-w-[265px] min-w-[200px] h-[290px] bg-[#140425] rounded-lg overflow-hidden flex flex-col border border-[#444444] mx-auto">
        <div className="w-full h-[169px] flex-shrink-0">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <h3 className="m-0 text-white font-spaceGrotesk text-lg font-bold leading-6">{title}</h3>
              <div className="flex items-center gap-1">
                <img src={creatorImage} alt="creator" className="w-3 h-3 rounded-full" />
                <span className="text-[#AFAFAF] text-xs">{creator}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <span className="text-[#AFAFAF] text-xs">Bid</span>
              <span className="text-[#AFAFAF] font-spaceGrotesk text-sm">{price}</span>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-[#8A2BE2] rounded-md text-white font-spaceGrotesk text-sm font-medium transition-colors duration-200 hover:bg-[#9D3FF3]"
          >
            Stream and Buy
          </button>
        </div>
      </div>
    );
  };

  // ExploreButton
  const ExploreButton: React.FC = () => {
    return (
      <button
        className="flex items-center justify-center px-4 py-3 min-w-[133px] h-[44px] bg-gradient-to-b from-[#e22bcc] to-[#fbb03b] border border-[#8a2be2] rounded-md cursor-pointer transition-transform duration-200 w-full max-w-[200px] mx-auto"
        onClick={() => {
          // Handle marketplace exploration
          console.log('Exploring marketplace...');
        }}
      >
        <span className="text-white text-xs text-center">Explore Marketplace</span>
      </button>
    );
  };

  // State for carousel navigation
  const [currentIndex, setCurrentIndex] = useState(0);

  // Product items (example)
  const products = [
    { image: 'https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/frame-19.png', title: 'Beat the flow', creator: 'Tyler Faye', price: '0.25 ETH' },
    { image: 'https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/frame-19-2.png', title: 'Deep Dive', creator: 'Anna Belle', price: '0.30 ETH' },
    { image: 'https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/frame-19-3.png', title: 'Artistic Dreams', creator: 'Liam Red', price: '0.40 ETH' },
    { image: 'https://dashboard.codeparrot.ai/api/image/Z5mlY3k7M7P7g8K8/frame-19-4.png', title: 'Future Beats', creator: 'Jade Smith', price: '0.50 ETH' },
  ];

  // Handle next and previous actions
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % products.length); // Moving by 2 products
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 2 + products.length) % products.length); // Moving by 2 products, and looping
  };

  // MarketplaceLayout
  return (
    <div className="flex flex-col w-full max-w-[1200px] mx-auto gap-12 p-6 box-border">
      <MarketplaceHeader />
      <CategoryFilters />
      <div className="flex flex-col gap-8">
        <div className="flex gap-8 flex-wrap justify-center md:flex-nowrap md:justify-start">
          {/* Desktop View - 4 products side by side */}
          <div className="hidden md:flex gap-8 w-full justify-between">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>

          {/* Mobile View - 2 products at a time with arrow buttons */}
          <div className="md:hidden flex gap-8 w-full justify-between">
            <ProductCard {...products[currentIndex]} />
            <ProductCard {...products[(currentIndex + 1) % products.length]} />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <ExploreButton />
      </div>
    </div>
  );
};

export default HomeMarketPlace;
