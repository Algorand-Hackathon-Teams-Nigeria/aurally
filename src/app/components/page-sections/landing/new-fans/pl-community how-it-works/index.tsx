'use client';
import Image from "next/image";


const NewCommunity = () => {
  return (
    <div className="relative w-full flex justify-center mb-9">

      <Image
        src="/images/Group 1835.svg"
        alt="Guy with headphones (Mobile)"
        width={5400}
        height={800}
        className="object-cover w-full h-[35vh] block sm:hidden pointer-events-none"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <Image
        src="/images/Join Community Bg.svg"
        alt="Guy with headphones (Desktop)"
        width={5400}
        height={800}
        className="object-cover w-full h-[35vh] sm:h-[70vh] lg:h-[90vh] sm:w-1/2 lg:w-3/4 xl:w-full hidden sm:block pointer-events-none"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-6 lg:translate-y-[70px] 2xl:translate-y-[70px] translate-y-[70px] translate-x-[-45px] lg:translate-x-[0px]">
          Join Our Community
        </div>
        <button
        onClick={() => {
          window.location.href = "https://app.aurally.xyz";
        }}
        className="bg-[#ebebeb] text-purple-700 font-comfortaa text-[16px] md:text-[20px] font-bold px-[10px] md:px-[13.42px] py-[6px] md:py-[8.95px] rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 lg:translate-y-[100px] translate-y-[70px]"
      >
        Get Started
      </button>
      </div>
    </div>
  );
};

export default NewCommunity;