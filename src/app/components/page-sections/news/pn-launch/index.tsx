import RightArrow from "@graphics/g-right-arrow";
import Image from "next/image";

const Launch = () => {
  return (
    <section
      className="flex flex-col items-start gap-10 lg:items-center justify-evenly w-full lg:flex-row"
      id="launch"
    >
      <div className="flex-1">
        <div className="flex flex-col gap-8 lg:gap-16 max-w-min">
          <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-transparent bg-clip-text font-bold text-6xl md:text-7xl lg:text-8xl">
            We have <br /> LAUNCHED!
          </h2>
          <div className="flex items-center gap-4">
            <p className="whitespace-nowrap font-medium text-xl">
              LANUNCH HIGHLIGHTS
            </p>
            <RightArrow className="rotate-90 max-w-6 lg:max-w-full lg:rotate-0" />
          </div>
        </div>
      </div>
      <div className="flex-1 self-center">
        <Image
          src="/images/aurally_launch.svg"
          alt="Aurally launch"
          width={600}
          height={500}
        />
      </div>
    </section>
  );
};

export default Launch;
