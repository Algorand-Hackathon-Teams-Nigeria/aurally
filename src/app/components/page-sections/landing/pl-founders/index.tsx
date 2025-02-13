import Image from "next/image";
import MI from "@assets/Mi.png";
import classes from "@styles/landing.module.css";
import Meshach from "@assets/Meshach.png";
import BallGradient from "@/app/components/BallGradient";

const FOUNDERS = [
  {
    name: "Meshach Ishaya",
    role: "CEO/Co-Founder",
    profession: "Technopreneur",
    image: Meshach,
    desc:
      "Meshach Ishaya is a visionary leader and technology expert, serving as the CEO of Ashinity Synergy Limited. His expertise spans DevOps, Networking, Blockchain Development, AI, and ML, making him a multi-faceted leader in the tech industry. Meshach’s leadership at Ashinity has driven transformative solutions, fostering collaboration between public and private sectors for societal benefit. His career reflects his unwavering dedication to excellence, innovation, and leveraging technology for societal advancement.",
  },
  {
    name: "MI Abaga",
    role: "CMO/Co-Founder",
    profession: "Music Icon and Tech Enthusiast",
    image: MI,
    desc:
      "M.I Abaga, the renowned Nigerian rapper, singer, and record producer, has been a dominant force in African hip hop for over two decades. Rising to fame with hits like &quot;Crowd Mentality&quot; and &quot;Action film,&quot; he&apos;s earned accolades such as Best Hip Hop at the MTV Africa Music Awards. As music exec and CEO of Chocolate City Music from 2015 to 2019, he showcased his exceptional entrepreneurial spirit, leading the label to greater heights. Beyond music, M.I is a tech enthusiast, founding Tasck in 2019 and Incredible Music in 2020 to groom and connect African creatives with global opportunities, blending his passion for music with innovative technology. His dynamic career exemplifies the fusion of music and tech, embodying the ethos of Aurally&apos;s mission.",
  },
];

const Founders = () => {
  return (
    <div className="flex flex-col gap-32 translate-y-[-205px] lg:translate-y-[-370px]">
      <div className="border px-4 overflow-hidden relative lg:px-10 rounded-3xl lg:rounded-[2rem] border-border/60">
        <BallGradient topOrBottom="top-[30%]" leftOrRight="right-0" />
        
        <div className="flex flex-col py-8 lg:py-16 gap-8 items-center md:flex-row w-full border-border/60">
          
          <div className="w-full flex flex-col items-center gap-8 lg:flex-row lg:gap-4">
            {/* Meshach's Image */}
            <div className="p-4 w-full lg:max-w-[250px] rounded-3xl bg-primary/20 bg-aural-waves bg-cover h-full">
              <Image
                src={Meshach}
                alt="Meshach Ishaya CEO"
                className="rounded-3xl object-cover w-full h-full"
                width={200}  
                height={200} 
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
              <div className="mt-6 text-2xl font-bold flex flex-col gap-2">
                <p className={`${classes.txt_grd2}`}>CEO/Co-Founder</p>
                <p className="text-grey-04">Meshach Ishaya</p>
              </div>
            </div>

            {/* MI's Image */}
            <div className="p-4 w-full lg:max-w-[250px] rounded-3xl bg-primary/20 bg-aural-waves bg-cover h-full">
              <Image
                src={MI}
                alt="MI Abaga CMO"
                className="rounded-3xl object-cover w-full h-full"
                width={200}  
                height={200} 
                style={{ userSelect: "none", pointerEvents: "none" }}
              />
              <div className="mt-6 text-2xl font-bold flex flex-col gap-2">
                <p className={`${classes.txt_grd2}`}>CMO/Co-Founder</p>
                <p className="text-grey-04">MI Abaga</p>
              </div>
            </div>

            
            <div className="flex-1 text-lg font-roboto text-justify mt-3">
              <p>
                Together, Meshach and M.I represent the perfect synergy of music and
                technology, bringing a wealth of experience and innovation to Aurally.
                As co-founders, they are dedicated to revolutionizing the music industry
                and empowering artists through the transformative power of blockchain
                technology. With their combined expertise and vision, Aurally is poised
                to redefine the future of music streaming and create unparalleled
                opportunities for artists and listeners alike.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founders;
