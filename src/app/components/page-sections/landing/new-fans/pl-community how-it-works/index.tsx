import Image from "next/image";


const NewCommunity = () => {
  return (
    <div className="relative w-full flex justify-center mb-9">

      <Image
        src="/images/Group 1835.svg"
        alt="Guy with headphones (Mobile)"
        width={5400}
        height={800}
        className="object-cover w-full h-[35vh] block sm:hidden"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <Image
        src="/images/Join Community Bg.svg"
        alt="Guy with headphones (Desktop)"
        width={5400}
        height={800}
        className="object-cover w-full h-[35vh] sm:h-[70vh] lg:h-[90vh] sm:w-1/2 lg:w-3/4 xl:w-full hidden sm:block"
        style={{ maxWidth: '100%', height: 'auto' }}
      />

      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold mb-6 lg:translate-y-[70px] 2xl:translate-y-[70px] translate-y-[70px] translate-x-[-70px] lg:translate-x-[0px]">
          Join Our Community
        </div>
        <a
          title="Aurally App"
          href="https://app.aurally.xyz"
          target="_blank"
          className="px-8 py-2 rounded-[40px] mb-10 bg-white text-[#1C51FE] text-lg font-semibold lg:translate-y-[120px] 2xl:translate-y-[100px] translate-y-[70px] translate-x-[-100px] lg:translate-y-[00px] 2xl:translate-x-[-10px] lg:translate-x-[-10px]"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default NewCommunity;