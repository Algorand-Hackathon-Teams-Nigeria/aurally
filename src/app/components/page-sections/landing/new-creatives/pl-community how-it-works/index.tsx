import Image from "next/image";

const CreativeCommunity = () => {
  return (
    <div className="relative w-full flex justify-center mb-9 lg:translate-y-[0px] translate-y-[100px] min-h-[350px] sm:min-h-[60px] lg:translate-x-[0px] translate-x-[-20px]">
     
      <Image
        src="/guy with headphones.png"
        alt="Guy with headphones"
        width={1400}
        height={800} 
        className="object-cover w-full"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        {/* Title */}
        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-6">
          Join Our Community
        </div>

        {/* Button */}
        <a
          title="Aurally App"
          href="https://app.aurally.xyz"
          target="_blank"
          className="px-8 py-2 rounded-[40px] mb-5 bg-white text-[#1C51FE] text-lg font-semibold"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default CreativeCommunity;
