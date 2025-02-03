import React from "react";
import { Card, Image } from "@heroui/react";

// Artists array with specific names for each image
const artists = [
  { id: 1, name: "Action Film", image: "/images/Artist-4.svg" },
  { id: 2, name: "M.I. Abaga", image: "/images/Artist-3.svg" },
  { id: 3, name: "Swerve Sal", image: "/images/Artist-2.svg" },
  { id: 4, name: "Odysseus Jesse Jagz", image: "/images/Artist-1.svg" },
];

// 🔹 Duplicate slides for a seamless infinite effect
const duplicatedArtists = [...artists, ...artists];

export default function InfiniteCarousel() {
  return (
    <div className="w-full overflow-hidden relative">
      <div className="flex gap-4 animate-scroll">
        {duplicatedArtists.map((artist, index) => (
          <div key={index} className="w-full min-w-[300px]">
            <Card isFooterBlurred className="border-none w-full" radius="lg">
              <Image
                alt={artist.name}
                className="object-cover w-full h-[300px]"
                src={artist.image}
                width={600}
                height={300}
              />
              {/* Specific names with line break */}
              <div className="text-center mt-2 text-gray-400 font-medium"> {/* Change text color */}
                {artist.name.split(" ").map((word, i) => (
                  <p key={i} className="font-space-grotesk text-sm">{word}</p>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* 🔹 CSS for Infinite Scrolling Animation */}
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
          animation: scroll 15s linear infinite; /* Adjust speed */
        }
        
        /* Importing the Space Grotesk font */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap');

        .font-space-grotesk {
          font-family: 'Space Grotesk', sans-serif;
        }
      `}</style>
    </div>
  );
}
