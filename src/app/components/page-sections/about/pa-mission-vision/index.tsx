import BallGradient from "@/app/components/BallGradient";
import PrimaryCirclesCard from "@/app/components/atoms/a-primary-circles-card";

const MissionVision = () => {
  return (
    <section className="relative  translate-y-[-205px] lg:translate-y-[-370px]" id="mission-vision">
      <PrimaryCirclesCard>
        <div className="w-full px-4 lg:px-14 lg:py-4 items-center flex flex-col gap-14 lg:flex-row justify-evenly">
          <div>
            <h3 className="text-4xl mb-4 text-secondaryYellow font-bold">
              Vision
            </h3>
            <p className="text-lg">
              Our vision is to redefine the creative experience by harnessing
              the power of blockchain technology. We envision a future where
              Aurally serves as the premier platform for artists to showcase
              their talent, connect with a global  audience, and thrive in a
              transparent and inclusive creator-verse.
            </p>
          </div>
          <div className="w-full lg:w-px h-px lg:h-40 bg-white/70" />
          <div>
            <h3 className="text-4xl mb-4 text-secondaryYellow font-bold">
              Mission
            </h3>
            <p className="text-lg">
              At Aurally, our mission is to democratize the music industry by
              empowering creatives and rewarding music enthusiasts worldwide. We
              strive to cultivate a vibrant community where innovation,
              creativity, and transparency thrive, placing our community of
              creatives and fans at the heart of everything we do.
            </p>
          </div>
        </div>
      </PrimaryCirclesCard>
      <BallGradient topOrBottom="-bottom-64" leftOrRight="left-8" />
    </section>
  );
};

export default MissionVision;
