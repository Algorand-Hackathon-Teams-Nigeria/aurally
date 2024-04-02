import Link from "next/link";
import PrimaryCirclesCard from "@atoms/a-primary-circles-card";

const Community = () => {
  return (
    <PrimaryCirclesCard>
      <div>
        <div className="text-[28px] sm:text-4xl lg:text-5xl font-bold text-center mb-9">
          Join Our Community
        </div>
        <Link
          title="Aurally App"
          href="https://app.aurally.xyz"
          target="_blank"
          className="w-max block px-8 py-4 rounded-[40px] bg-white text-[#1C51FE] mx-auto"
        >
          Get Started
        </Link>
      </div>
    </PrimaryCirclesCard>
  );
};

export default Community;
