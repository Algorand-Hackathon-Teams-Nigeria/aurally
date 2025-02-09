import Image from "next/image";


const How_it_works = () => {
  return (
    
      <div>
       
        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-center mb-9">
          How it works
        </div>

        
        <div className="w-full flex flex-col items-center mb-9">
         
          <div className="hidden md:block w-full">
            <Image
              src="/how it works.png"
              alt="How it works"
              width={1200}
              height={600}
              className="object-contain mx-auto pointer-events-none"
            />
          </div>

          {/* Mobile View */}
          <div className="block md:hidden">
            <Image
              src="/how it works1.png"
              alt="How it works - part 1"
              width={300} 
              height={200}
              className="object-contain mx-auto pointer-events-none"
            />
            <Image
              src="/how it works2.png"
              alt="How it works - part 2"
              width={300} 
              height={200}
              className="object-contain mx-auto mt-4 pointer-events-none"
            />
          </div>
        </div>

        {/* Button */}
        <a
          title="Aurally App"
          href="https://app.aurally.xyz"
          target="_blank"
          className="w-max block px-8 py-4 rounded-[40px] bg-white text-[#1C51FE] mx-auto"
        >
          Get Started
        </a>
      </div>
  
  );
};

export default How_it_works;
