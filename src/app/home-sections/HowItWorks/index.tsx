import { works } from "@/app/data";
import classes from "@/app/styles/landing.module.css";
import How from "../../assets/howitworks.png";
import Image from "next/image";
import BallGradient from "@/app/component/BallGradient";

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center" id="works">
      <h2
        className={`text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold relative z-[5] ${classes.txt_grd}`}
      >
        How it works
      </h2>
      <div className="text-center sm:text-lg md:text-xl max-w-[934px] mt-6 mb-14 relative z-[5]">
        Immerse yourself in the world of digital creativity like never before.
        Here is a step on how our platform works
      </div>
      <div className="flex flex-col-reverse md:flex-row mt-8 lg:gap-16 items-center gap-20">
        <div className="flex-1 flex justify-start relative z-[5]">
          <Image src={How} alt="" className="" priority />
        </div>
        <div className="space-y-6 md:space-y-14 text-center md:text-left flex-1 relative">
          <BallGradient topOrBottom="top-1/2 -translate-y-1/2" leftOrRight="left-1/2 -translate-x-1/2" />
          {works.map(({ title, desc }, index) => (
            <div key={index} className="relative z-[5]">
              <div className="text-xl lg:text-2xl mb-7 font-bold">{title}</div>
              <div className="text-xs md:text-sm leading-normal">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
