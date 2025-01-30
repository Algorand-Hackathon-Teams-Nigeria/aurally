import Image from "next/image";

const CreativeWorks = () => {
  return (
    <div className="lg:translate-y-[0px] translate-y-[180px] lg:translate-x-[0px] translate-x-[-27px]">
      <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-center mb-9">
        How it works
      </div>

      <div className="w-full flex flex-col items-center mb-9">
        {/* Desktop View */}
        <div className="hidden md:block w-full">
          <Image
            src="/how it works.png"
            alt="How it works"
            width={1200}
            height={600}
            className="object-contain mx-auto"
          />
        </div>

        {/* Mobile View */}
        <div className="block md:hidden">
          <Image
            src="/how it works1.png"
            alt="How it works - part 1"
            width={240}
            height={160} 
            className="object-contain max-w-[90%] mx-auto"
          />
          <Image
            src="/how it works2.png"
            alt="How it works - part 2"
            width={240} 
            height={160} 
            className="object-contain max-w-[90%] mx-auto mt-4"
          />
        </div>
      </div>

      {/* Button */}
      <a
        title="Aurally App"
        href="https://app.aurally.xyz"
        target="_blank"
        className="w-max block px-8 py-2 rounded-[40px] bg-white text-[#1C51FE] mx-auto"
      >
        Get Started
      </a>
    </div>
  );
};

export default CreativeWorks;
