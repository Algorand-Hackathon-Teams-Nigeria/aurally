"use client";

import Image from "next/image";
import MI from "@assets/Frame 1000008049.png";
import classes from "@styles/landing.module.css";
import Meshach from "@assets/Frame 1000008049-1.png";
import BallGradient from "@/app/components/BallGradient";

const FOUNDERS = [
  {
    name: "Meshach Ishaya",
    role: "CEO/Co-Founder",
    profession: "Technopreneur",
    image: Meshach,
    desc:
      "Meshach Ishaga is a visionary leader and technology expert, serving as the CEO of Ashinity Synergy Limited and a Senior Consultant at Deep Learning Science Ltd. His expertise spans DevOps, Networking, Blockchain Development, AI, and ML, making him a multi-faceted leader in the tech industry. Meshach&apos;s leadership at Ashinity has driven transformative solutions, fostering collaboration between public and private sectors for societal benefit. His role as CTO at Jamborow Ltd. underscores his commitment to financial inclusion and empowerment in Africa. Meshach&apos;s career reflects his unwavering dedication to excellence, innovation, and leveraging technology for societal advancement.",
  },
  {
    name: "MI Abaga",
    role: "CMO/Co-Founder",
    profession: "Music Icon and Tech Enthusiast",
    image: MI,
    desc:
      "M.I Abaga, the renowned Nigerian rapper, singer, and record producer, has been a dominant force in African hip hop for over two decades. Rising to fame with hits like &quot;Crowd Mentality&quot; and &quot;Action film,&quot; he&apos;s earned accolades such as Best Hip Hop at the MTV Africa Music Awards. As music exec and CEO of Chocolate City Music from 2015 to 2019, he showcased his exceptional entrepreneurial spirit, leading the label to greater heights. Beyond music, M.I is a tech enthusiast, founding Tasck in 2019 and Incredible Music in 2020 to groom and connectAfrican creatives with global opportunities, blending his passion for music with innovative technology. His dynamic career exemplifies the fusion of music and tech, embodying the ethos of Aurally&apos;s mission.",
  },
];

const Founders = () => {
  return (
    <div className="flex flex-col gap-32">
      <div className="border px-4 overflow-hidden relative lg:px-10 rounded-3xl lg:rounded-[2rem] border-border/60">
        <BallGradient topOrBottom="top-[30%]" leftOrRight="right-0" />
        {FOUNDERS.map((founder, id) => (
          <div
            key={founder.name}
            className={`flex flex-col py-8 lg:py-16 items-center md:flex-row gap-8 w-full border-border/60 ${id !== FOUNDERS.length - 1 ? "border-b" : ""
              }`}
          >
            <div className="flex-[0.4]">
              <div className="p-8 w-fit rounded-3xl bg-primary/20 bg-aural-waves bg-cover">
                <Image
                  src={founder.image}
                  alt={founder.name.concat(" ").concat(founder.role)}
                  className="rounded-3xl"
                />
                <div className="mt-6 text-3xl font-bold flex flex-col gap-2">
                  <p className={`${classes.txt_grd2}`}>{founder.role}</p>
                  <p className="text-grey-04">{founder.name}</p>
                </div>
              </div>
            </div>
            <div className=" flex-1">
              <h3 className="text-4xl font-bold">{founder.profession}</h3>
              <p
                className="font-roboto text-justify text-lg mt-3"
                dangerouslySetInnerHTML={{ __html: founder.desc }}
              >
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="max-w-4xl self-center text-center text-xl">
        Together, Meshach and M.I represent the perfect synergy of music and
        technology, bringing a wealth of experience and innovation to Aurally.
        As co-founders, they are dedicated to revolutionizing the music industry
        and empowering artists through the transformative power of blockchain
        technology. With their combined expertise and vision, Aurally is poised
        to redefine the future of music streaming and create unparalleled
        opportunities for artists and listeners alike.
      </p>
    </div>
  );
};

export default Founders;
