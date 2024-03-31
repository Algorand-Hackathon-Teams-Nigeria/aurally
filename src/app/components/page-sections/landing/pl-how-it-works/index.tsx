import Link from "next/link";
import Image from "next/image";
import { WORKS } from "@/app/data";
import BallGradient from "@components/BallGradient";
import classes from "@/app/styles/landing.module.css";

const HowItWorks = () => {
  return (
    <section className="flex flex-col items-center" id="how-it-works">
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl w-fit self-start font-bold relative z-[5] ${classes.txt_grd2}`}
      >
        How it works
      </h2>
      <div className="grid sm:grid-cols-2 justify-center lg:grid-cols-4 mt-8 gap-10 sm::gap-12 xl:gap-20 relative">
        <BallGradient
          topOrBottom="top-1/2 -translate-y-1/2"
          leftOrRight="right-0"
        />
        {WORKS.map((how) => (
          <div
            key={how.title}
            className="relative border-2 bg-subBackground/40 border-gray-500/20 p-4 rounded-md z-[5] text-center sm:text-start"
          >
            <Image
              width={143}
              height={140}
              src={how.img}
              alt={how.title}
              className="h-[140px]"
            />
            <div className="text-xl lg:text-2xl mb-3 sm:mb-7 font-bold">
              {how.title}
            </div>
            <div className="text-xs md:text-sm leading-normal">{how.desc}</div>
          </div>
        ))}
      </div>
      <Link
        title="Aurally App"
        href="https://app.aurally.xyz"
        target="_blank"
        className={`${classes.getBtn} flex w-[163px] mt-8 lg:mt-12 self-start`}
      >
        Get Started
      </Link>
    </section>
  );
};

export default HowItWorks;
