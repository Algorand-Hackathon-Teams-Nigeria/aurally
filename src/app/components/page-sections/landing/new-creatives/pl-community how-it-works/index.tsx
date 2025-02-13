"use client";
import Image from "next/image";

const CreativeCommunity = () => {
  return (
    <div className="relative flex justify-center mb-9 lg:translate-y-[-50px] translate-y-[-50px] lg:translate-x-[0px] translate-x-[-24px]">
      <div className="sm:hidden w-screen">
        <Image
          src="/images/Group 1835.svg"
          alt="Guy with headphones (Mobile)"
          width={5400}
          height={800}
          className="object-cover w-screen h-[35vh] pointer-events-none"
          style={{ height: 'auto' }}
        />
      </div>

      <div className="hidden sm:block w-full">
        <Image
          src="/images/Join Community Bg.svg"
          alt="Guy with headphones (Desktop)"
          width={5400}
          height={800}
          className="object-cover w-full h-[35vh] sm:h-[70vh] lg:h-[90vh] pointer-events-none"
          style={{ height: 'auto' }}
        />
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-6 lg:translate-y-[70px] 2xl:translate-y-[70px] translate-y-[60px] translate-x-[-85px] lg:translate-x-[0px] block sm:hidden">
          Join Aurally <span className="block">Today</span>
        </div>

        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-6 lg:translate-y-[70px] 2xl:translate-y-[70px] translate-y-[70px] translate-x-[-45px] lg:translate-x-[0px] hidden sm:block">
          Join Our Community
        </div>

        <p className="text-sm text-gray-300 w-full  mt-4 translate-y-[30px] translate-x-[-25px] lg:translate-x-[10px]">
  Take control of your music career with Aurally&apos;s
  <span className=" block sm:block">artist-centric platform.</span>
</p>


        <button
          onClick={() => {
            window.location.href = "https://app.aurally.xyz";
          }}
          className="bg-[#ebebeb] text-purple-700 font-comfortaa text-[16px] md:text-[20px] font-bold px-[10px] md:px-[13.42px] py-[6px] md:py-[8.95px] rounded-full cursor-pointer transition-transform duration-200 hover:scale-105 lg:translate-y-[100px] translate-y-[50px] lg:translate-x-[0px] translate-x-[-80px]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default CreativeCommunity;
