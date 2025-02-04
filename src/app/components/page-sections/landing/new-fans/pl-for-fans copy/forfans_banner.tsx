"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/Frame 1000008316.png",
  "/Frame 1000008316.png",
  "/Frame 1000008316.png",
];

const LandingSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[10vh] overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-10">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />

        {/* Carousel Images */}
        <div className="flex animate-scroll">
          {images.concat(images).map((src, index) => (
            <div key={index} className="min-w-full">
              <Image
                src={src}
                alt={`Landing Frame ${index + 1}`}
                className="object-cover w-full h-full"
                width={1920}
                height={1080}
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingSection;
