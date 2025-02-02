import Image from "next/image";

const CreativeBanner = () => {
  return (
    <div className="relative w-full h-auto">
    
      <div className="relative w-screen h-auto transform sm:translate-y-[-142px] translate-y-[50px] ml-[-80px]">
        {/* Dark Overlay */}
        <div className="absolute left-[-10vw] right-[-10vw] top-0 bottom-0 bg-black opacity-50 z-10 h-[8vh]" />

        {/* Image */}
        <Image
          src="/creative-banner.png"
          alt="Landing Frame"
          className="w-full sm:w-[150vw]  object-cover sm:transform sm:translate-x-0 translate-x-[-1vw ] h-[8vh]"
          width={1200}
          height={800}
          priority
        />
      </div>
    </div>
  );
};

export default CreativeBanner;
