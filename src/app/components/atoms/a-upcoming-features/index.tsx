import React from "react";
import { Feature, UPCOMING_FEATURES } from "./mock";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  feature: Feature;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <li className="flex flex-col gap-8">
      <div className="bg-primary/10 h-[380px] border border-primary/40 rounded-md flex items-center justify-center w-full">
        <Image src={feature.img} alt={feature.title} width={300} height={300} />
      </div>
      <h4 className="font-bold text-3xl text-secondaryYellow">
        {feature.title}
      </h4>
      <div>
        <p className="line-clamp-3 text-white/80">{feature.desc}</p>
        <Link
          className="text-primary hover:underline focus:underline"
          href={feature.link}
        >
          Learn more
        </Link>
      </div>
    </li>
  );
};

const UpComingFeatures = () => {
  return (
    <section id="upcoming">
      <h3 className="text-5xl md:text-6xl lg:text-8xl text-center md:text-start leading-relaxed bg-gradient-to-b from-secondaryPink to-secondaryYellow text-transparent bg-clip-text font-bold">
        Exciting Upcoming Features
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-24">
        {UPCOMING_FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </ul>
    </section>
  );
};

export default UpComingFeatures;
