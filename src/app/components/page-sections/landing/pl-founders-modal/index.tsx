"use client";

import Image from "next/image";
import { Modal } from "@mantine/core";
import { atom, useAtom } from "jotai";
import MI from "@assets/Frame 1000008049.png";
import classes from "@styles/landing.module.css";
import Meshach from "@assets/Frame 1000008049-1.png";

export const modalAtom = atom(false);

const FoundersModal = () => {
  const [opened, setModal] = useAtom(modalAtom);

  const close = () => {
    setModal(() => false);
  };

  return (
    <Modal opened={opened} onClose={close} size="auto">
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl lg:pl-6 lg:pr-20 pb-10 border-b border-borderColor">
        <div className="p-4 rounded-lg bg-primary/50 shrink-0  h-max max-w-max">
          <Image src={Meshach} alt="" />
          <div className="mt-3 text-3xl font-bold">
            <div className={`${classes.txt_grd2}`}>CEO/Co-Founder</div>
            <div className="text-grey-04">Meshach Ishaya</div>
          </div>
        </div>
        <div className="max-w-[512px]">
          <div className="text-3xl font-bold">Technopreneur</div>
          <div className="font-roboto mt-3">
            Meshach Ishaga is a visionary leader and technology expert, serving
            as the CEO of Ashinity Synergy Limited and a Senior Consultant at
            Deep Learning Science Ltd. His expertise spans DevOps, Networking,
            Blockchain Development, AI, and ML, making him a multi-faceted
            leader in the tech industry. Meshach&apos;s leadership at Ashinity
            has driven transformative solutions, fostering collaboration between
            public and private sectors for societal benefit. His role as CTO at
            Jamborow Ltd. underscores his commitment to financial inclusion and
            empowerment in Africa. Meshach&apos;s career reflects his unwavering
            dedication to excellence, innovation, and leveraging technology for
            societal advancement.
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl lg:pl-6 lg:pr-20 py-10 border-b border-borderColor">
        <div className="p-4 rounded-lg bg-primary/50 shrink-0 h-max max-w-max">
          <Image src={MI} alt="" />
          <div className="mt-3 text-3xl font-bold">
            <div className={`${classes.txt_grd2}`}>CMO/Co-Founder</div>
            <div className="text-grey-04">MI Abaga</div>
          </div>
        </div>
        <div className="max-w-[512px]">
          <div className="text-3xl font-bold">
            Music Icon and Tech Enthusiast
          </div>
          <div className="font-roboto mt-3">
            M.I Abaga, the renowned Nigerian rapper, singer, and record
            producer, has been a dominant force in African hip hop for over two
            decades. Rising to fame with hits like &quot;Crowd Mentality&quot;
            and &quot;Action film,&quot; he&apos;s earned accolades such as Best
            Hip Hop at the MTV Africa Music Awards. As music exec and CEO of
            Chocolate City Music from 2015 to 2019, he showcased his exceptional
            entrepreneurial spirit, leading the label to greater heights. Beyond
            music, M.I is a tech enthusiast, founding Tasck in 2019 and
            Incredible Music in 2020 to groom and connectAfrican creatives with
            global opportunities, blending his passion for music with innovative
            technology. His dynamic career exemplifies the fusion of music and
            tech, embodying the ethos of Aurally&apos;s mission.
          </div>
        </div>
      </div>
      <div className="pt-10 max-w-5xl lg:pl-6 lg:pr-20 pb-10">
        Together, Meshach and M.I represent the perfect synergy of music and
        technology, bringing a wealth of experience and innovation to Aurally.
        As co-founders, they are dedicated to revolutionizing the music industry
        and empowering artists through the transformative power of blockchain
        technology. With their combined expertise and vision, Aurally is poised
        to redefine the future of music streaming and create unparalleled
        opportunities for artists and listeners alike.
      </div>
    </Modal>
  );
};

export default FoundersModal;
