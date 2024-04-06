import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      id="hero"
      className="w-full relative flex items-center justify-center"
    >
      <Image
        className="w-full hidden lg:block"
        src="/images/academy_desktop_hero.svg"
        alt="academy"
        width={1200}
        height={424}
      />
      <Image
        className="w-full lg:hidden"
        src="/images/academy_mobile_hero.svg"
        alt="academy"
        width={1200}
        height={424}
      />
      <div className="bg-black/80 absolute bottom-4 self-center lg:py-6 lg:left-4 max-w-[94%] lg:max-w-[550px] p-4 rounded-3xl flex flex-col gap-4">
        <h4 className="text-3xl font-bold">
          How to Get Started with Aurally
        </h4>
        <p className="line-clamp-3">
          For the ordinary music listener/user, getting started with Aurally is
          simple and seamless. Here’s a step-by-step guide to help you begin
          your musical journey: HOW TO GET STARTED : Open the Aurally Platform
        </p>
        <Link
          className="bg-primary p-2 px-3 rounded-md hover:bg-primary/70 transition-all w-fit"
          href="https://aurally.medium.com/how-to-get-started-with-aurally-8d212e205bb9"
        >
          Read More
        </Link>
      </div>
    </section>
  );
};

export default Hero;
