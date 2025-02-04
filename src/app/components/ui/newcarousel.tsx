'use client';

import React from "react";
import { Card, Image } from "@heroui/react";

const carouselImages = [
  {
    src: "/images/Artist-1.svg",
    overlay: "/Vector 3.png",
    title: "Odysseus Jesse Jagz",
  },
  {
    src: "/images/Artist-2.svg",
    overlay: "/Vector 3.png",
    title: "Swerve Sal",
  },
  {
    src: "/images/Artist-3.svg",
    overlay: "/Vector 2.png",
    title: "M.I. Abaga",
  },
  {
    src: "/images/Artist-4.svg",
    overlay: "/Vector 3.png",
    title: "Chapt@5ive",
  },
  {
    src: "/images/ckay.svg",
    overlay: "/Vector 4.png",
    title: "CKay",
  },
  {
    src: "/images/ice-prince.svg",
    overlay: "/Vector 1.png",
    title: "Ice Prince",
  },
];

const InfiniteCarousel = () => {
  return (
    <div className="relative w-full overflow-hidden">
     
      <div className="flex gap-4 animate-scroll w-[200%] sm:w-[300%]">
        {carouselImages.concat(carouselImages).map((image, index) => (
          <div key={index} className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] relative">
            <Card isFooterBlurred className="border-none w-full" radius="lg">
              <div className="relative">
                <Image
                  alt={`Carousel Image ${index + 1}`}
                  className="object-cover w-full h-[250px] sm:h-[300px]"
                  src={image.src}
                  width={600}
                  height={300}
                />
                <div className="absolute bottom-0 w-full h-[50px]">
                  <Image
                    alt="Overlay"
                    className="object-cover w-full h-[50px] rounded-b-lg"
                    src={image.overlay}
                    width={600}
                    height={50}
                  />
                  <p className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold z-10">
                    {image.title}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

     
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          display: flex;
          white-space: nowrap;
          animation: scroll 20s linear infinite;
          will-change: transform;
        }

        @media (max-width: 768px) {
          .animate-scroll {
            animation-duration: 25s;
            width: 400%; /* Increase width to fit images */
          }
        }

        @media (max-width: 480px) {
          .animate-scroll {
            animation-duration: 30s;
            width: 500%; /* Ensure mobile has enough width */
          }
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;
