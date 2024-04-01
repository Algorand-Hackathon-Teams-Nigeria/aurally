import Image from "next/image";
import BallGradient from "@components/BallGradient";

const Background = () => {
  return (
    <section
      id="background"
      className="flex flex-col items-center gap-20 xl:flex-row"
    >
      <BallGradient topOrBottom="top-8" leftOrRight="right-8" />
      <BallGradient topOrBottom="top-48" leftOrRight="left-8" />
      <div className="flex-1 flex flex-col gap-8">
        <h2 className="bg-gradient-to-b from-secondaryPink to-secondaryYellow text-5xl lg:text-6xl font-bold text-transparent bg-clip-text mb-4">
          Background
        </h2>
        <p className="text-lg">
          In the digital age, creativity knows no bounds. From music to visual
          art, creators around the globe are constantly pushing the boundaries
          of expression and innovation. However, navigating the complexities of
          the modern creative sector, particularly in the music industry, can be
          daunting for independent artists seeking recognition and fair
          compensation for their craft.
        </p>
        <p className="text-lg">
          At Aurally, we believe in championing artistic freedom. Our platform
          is designed to{" "}
          <span className="bg-gradient-to-r from-secondaryPink to-secondaryYellow text-transparent bg-clip-text">
            empower musicians, artists, and creators to reclaim ownership of
            their work.
          </span>{" "}
          With Aurally, creators can manage, share their creations with the
          world and monetize in real time.
        </p>
      </div>
      <div className="flex-1 flex w-full items-center justify-center">
        <Image
          src="/images/vr_imersed.svg"
          alt="Guy imersed in VR"
          width={513}
          height={439}
        />
      </div>
    </section>
  );
};

export default Background;
