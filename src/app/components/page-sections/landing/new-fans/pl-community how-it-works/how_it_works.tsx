'use client';

import React from "react";

interface HowItWorksProps {
  onGetStarted?: () => void;
}

const How_it_works: React.FC<HowItWorksProps> = ({ onGetStarted = () => {} }) => {
  const steps = [
    { number: "01", title: "Launching the\nDApps" },
    { number: "02", title: "Connecting Your\nWallet" },
    { number: "03", title: "Start\nStreaming" },
    { number: "04", title: "Enjoy the\nExperience" },
  ];

  return (
    <div className="flex flex-col items-center gap-[60px] p-5 w-full max-w-[1201px] mx-auto">
      <h1 className="font-space-grotesk text-[48px] font-bold text-[#ebebeb] tracking-[-0.25px] leading-[64px] text-center w-full m-0">
        How it works
      </h1>

      <div className="grid grid-cols-2 gap-[20px] md:flex md:flex-row md:justify-between md:gap-[107px] w-full lg:translate-x-[0px] translate-x-[25px]">
        {steps.map((item, index) => (
          <div key={index} className="flex flex-col gap-[35px] flex-1">
            <div className="relative h-[80px] md:h-[120px] mb-[20px] md:mb-[35px]">
              <div className="absolute top-[6px] text-[120px] md:text-[180px] font-bold text-[#c9cbce] leading-[96px] md:leading-[146px] font-oswald">
                {item.number}
              </div>
            </div>
            <div className="font-space-grotesk text-[16px] md:text-[24px] font-bold text-[#f5f6f7] leading-[24px] md:leading-[32px] whitespace-pre-line">
              {item.title}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          window.location.href = "https://app.aurally.xyz";
        }}
        className="bg-[#ebebeb] text-purple-700 font-comfortaa text-[16px] md:text-[20px] font-bold px-[10px] md:px-[13.42px] py-[6px] md:py-[8.95px] rounded-full cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        Get Started
      </button>
    </div>
  );
};

export default How_it_works;
