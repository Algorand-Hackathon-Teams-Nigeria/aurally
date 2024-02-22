import { works } from "@/app/data";
import classes from "@/app/styles/landing.module.css";
import BallGradient from "@/app/component/BallGradient";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center" id="works">
      <h2
        className={`text-center text-3xl md:text-4xl lg:text-5xl xl:text-[4rem] font-bold relative z-[5] ${classes.txt_grd2}`}
      >
        How it works
      </h2>
      <div className="grid sm:grid-cols-2 justify-center lg:grid-cols-4 mt-8 gap-10 sm::gap-16 lg:gap-20 relative">
        <BallGradient
          topOrBottom="top-1/2 -translate-y-1/2"
          leftOrRight="right-0"
        />
        {works.map(({ title, desc }, index) => (
          <div key={index} className="relative z-[5] text-center sm:text-start">
            <div className="text-xl lg:text-2xl mb-3 sm:mb-7 font-bold">{title}</div>
            <div className="text-xs md:text-sm leading-normal">{desc}</div>
          </div>
        ))}
      </div>
      <Link
        href="https://app.aurally.xyz"
        target="_blank"
        className={`${classes.getBtn} flex w-[163px] mt-8 lg:mt-12 mx-auto lg:mx-0`}
      >
        Get Started
      </Link>
    </div>
  );
};

export default HowItWorks;
